import * as fs from 'fs';
import * as path from 'path';
import { fileType } from '../store/flow/flow-types';

export function getFileType(filePath: string): fileType {
  switch (path.extname(filePath)) {
    case '.csv':
      return 'csv';
    case '.tsv':
      return 'tsv';
    case '.json':
      return 'json';
    default:
      return 'unknown';
  }
}

export function getFileSize(filePath: string) {
  const fileDetails = fs.statSync(filePath);
  if (fileDetails.isFile()) {
    return fileDetails.size / (1024 * 1024);
  }
  throw new Error('Error: Not a file.');
}

export abstract class FileProcessor {

  private static readonly MB_IN_BYTES = 1000000.0;
  private static readonly FILE_SIZE_THRESHOLD: number = 30 * FileProcessor.MB_IN_BYTES;
  private static readonly MAX_CHUNK_SIZE: number = 10 * FileProcessor.MB_IN_BYTES;

  private readonly _filePath: string;
  private readonly _stats: fs.Stats;

  get filePath(): string {
    return this._filePath;
  }

  get stats(): fs.Stats {
    return this._stats;
  }

  protected constructor(filePath: string) {
    this._filePath = filePath;
    this._stats = fs.statSync(this.filePath);
  }

  public isSplittable() {
    return this.stats.size > FileProcessor.FILE_SIZE_THRESHOLD;
  }

  /*
  * splits large files into number of small temp files.
  * */
  protected abstract split(): void;

  /*
  * merge splitted  files into single file.
  * */
  protected abstract merge(): void;

  /*
  * process file
  * */
  protected abstract process(): void;

  /*
  * get split points and get points through callback
   * used for actual file splitting or optimised reading for grid
  * */
  protected splitCursors(callback: (points: number[]) => void) {
    if (this.isSplittable()) {
      fs.stat(this.filePath, (err, stat) => {
        fs.open(this.filePath, 'r', (err, fd) => {
          if (err) {
            throw err;
          }
          let i = 0;
          const fileSize = stat.size;
          const points: number[] = [];
          let chunkCount = Math.ceil(fileSize / FileProcessor.MAX_CHUNK_SIZE);
          const approxChunkSize = Math.ceil(fileSize / chunkCount);

          let approxEndCursor = approxChunkSize;
          points.push(0);
          const readLastDelimiter = (buf: Buffer) => {
            fs.read(fd, buf, 0, buf.length, approxEndCursor - i, (err, bytesRead, buffer) => {
              if (err) {
                throw err;
              }
              if (buffer[0] === 0x0a) {
                const endCursor = approxEndCursor - i;
                const startCursor = endCursor + 1;
                points.push(endCursor);
                points.push(startCursor);
                approxEndCursor = startCursor + approxChunkSize;
                chunkCount--;
                i = 0;
                if (chunkCount === 1) {
                  points.push(fileSize);
                  callback(points);
                } else {
                  readLastDelimiter(Buffer.alloc(1));
                }
              } else {
                i++;
                readLastDelimiter(Buffer.alloc(1));
              }
            });
          };
          readLastDelimiter(Buffer.alloc(1));
        });
      });
    } else {
      callback([0, this.stats.size]);
    }
  }

}
