import { FileProcessor, getFileType } from './file-processor';
import * as fs from 'fs';
import * as readline from 'readline';
import { ChunkDef, ColDef, colType, FileDataSource } from '../store/flow/flow-types';
import * as parse from 'csv-parse/lib/sync';

export type ExpandedChunkDef = ChunkDef & { colTypes: colType[] };

export class CSVFileProcessor extends FileProcessor {

  constructor(filePath: string) {
    super(filePath);
  }

  public merge(): void {
    let i = 0;
    const writeChunk = () => {
      const tempFile = `./temp/temp_${i}.csv`;
      const wStream = fs.createWriteStream('./temp/result.csv', {flags: 'a'});
      const rStream = fs.createReadStream(tempFile);
      rStream
        .pipe(wStream)
        .on('close', () => {
          i++;
          if (i < 10) {
            writeChunk();
          } else {
            console.log('done merging!!');
          }
        });
    };
    writeChunk();
  }

  public split(): void {
    super.splitCursors(points => {
      for (let i = 0; i < points.length / 2; i++) {
        const startCursor = points[i * 2];
        const endCursor = points[i * 2 + 1];
        const tempFile = `./temp/temp_${i}.csv`;
        const rStream = fs.createReadStream(this.filePath, {start: startCursor, end: endCursor});
        const wStream = fs.createWriteStream(tempFile);
        rStream
          .pipe(wStream)
          .on('finish', () => {
            console.log(`write done for chunk: ${i}`);
          });
      }
    });
  }

  public process() {
    return new Promise<FileDataSource>(resolve => {
      this.splitCursors(points => {
        let fileDataSource: FileDataSource;
        let fileHeader: string[] = [];
        console.time(`process`);
        const chunks: Map<number, ExpandedChunkDef> = new Map();
        let rowsCount = 0;

        for (let i = 0; i < points.length / 2; i++) {
          let chunkRows = 0;
          const colTypes: colType[] = [];
          const startCursor = points[i * 2];
          const endCursor = points[i * 2 + 1];
          const rStream = fs.createReadStream(this.filePath, {start: startCursor, end: endCursor});
          const rl = readline.createInterface(rStream);
          rl.on('line', line => {
            if (line) {
              if (0 === rowsCount && 0 === i) {
                fileHeader = parse(line, {delimiter: ','})[0];
              } else {
                const lineData: string[] = parse(line, {delimiter: ','})[0];
                if (lineData && lineData.length === fileHeader.length) {
                  lineData.forEach((value, index) => {
                    if (colTypes.length === fileHeader.length) {
                      if (colTypes[index] !== 'string') {
                        if (colTypes[index] !== getType(value)) {
                          colTypes[index] = 'string';
                        }
                      }
                    } else {
                      colTypes.push(getType(value));
                    }
                  });
                } else {
                  // throw new Error(`No of items mismatched for chunk_${i} rows: ${chunkRows}`);
                  console.log(`No of items mismatched for chunk_${i} rows: ${chunkRows}`);
                }
                chunkRows++;
              }
              rowsCount++;
            }
          }).on('close', () => {
            chunks.set(i, {startCursor, endCursor, rows: chunkRows, colTypes});
            if (chunks.size === (points.length / 2)) {
              fileDataSource = {discriminator: 'FILE_DATA_SOURCE', path: this.filePath, fileType: getFileType(this.filePath), chunks, bufferSize: this.stats.size, rows: rowsCount, isValid: true, columns: this.constructColDef(fileHeader, chunks)};
              resolve(fileDataSource);
              console.timeEnd(`process`);
            }
          });
        }
      });
    });
  }

  private constructColDef(fileHeader: string[], chunkMap: Map<number, ExpandedChunkDef>): ColDef[] {
    const colDefArr: ColDef[] = [];
    // no bang
    let colTypes: colType[] = [];
    colTypes = chunkMap.get(0)!.colTypes;

    chunkMap.forEach((expandedChunkDef, key) => {
      if (key !== 0) {
        expandedChunkDef.colTypes.forEach((value, index) => {
          if (colTypes[index] !== 'string') {
            if (colTypes[index] !== value) {
              colTypes[index] = 'string';
            }
          }
        });
      }
    });

    const regExp = /\_/gi;
    fileHeader.forEach((value, index) => {
      colDefArr.push({columnName: value, tittle: value.toUpperCase().replace(regExp, ' '), display: true, displayIndex: index, index, expandedFormula: undefined, isSortable: true, isValid: true, source: 'initial', type: colTypes[index]});
    });
    return colDefArr;
  }
}

// TODO: try type-check module 
function getType(val: string): colType {
  const param = val.trim();
  if (param === 'true' || param === 'false') {
    return 'boolean';
  } else if (String(val).match(/^[0-9]+$/) !== null) {
    return 'number';
  } else if (String(val).match(/^(\d+\.?\d*|\.\d+)$/) !== null) {
    return 'decimal';
  } else {
    return 'string';
  }
}