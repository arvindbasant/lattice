import { FileDataSource } from '../store/flow/flow-types';
import { createReadStream } from 'fs';
import * as readline from 'readline';
import * as parse from 'csv-parse/lib/sync';
import { DataReader } from './data-reader';

export interface ReadIndex {
  start: { id: number, index: number } | null;
  end: { id: number, index: number } | null;
}

export default class FileDataReader extends DataReader {
  private readonly fileDataSource: FileDataSource;

  constructor(fileDataSource: FileDataSource) {
    super();
    this.fileDataSource = fileDataSource;
  }

  public read(start: number, end: number): Promise<string[][]> {
    return new Promise<string[][]>(resolve => {
      const data: string[][] = [];
      const readIndex = this.getReadIndex(start, end);
      if (readIndex.start !== null && readIndex.end !== null) {
        if (readIndex.start.id === readIndex.end.id) {
          // both in same chunk
          let chunkStart = readIndex.start.index;
          let pushData: boolean = false;
          const { chunks, path } = this.fileDataSource;
          const chunk = chunks.get(readIndex.start.id)!;
          const rStream = createReadStream(path, { start: chunk.startCursor, end: chunk.endCursor });
          const rl = readline.createInterface(rStream);
          rl.on('line', line => {
            if (line) {
              if (chunkStart === start) {
                pushData = true;
              }
              if (chunkStart === end) {
                pushData = false;
                rl.emit('close');
              }
              if (pushData) {
                data.push(parse(line, { delimiter: ',' })[0]);
              }
              chunkStart++;
            }
          }).on('close', () => {
            resolve(data);
          });
        }
      }
    });

  }

  private getReadIndex(start: number, end: number): ReadIndex {
    const allChunks = this.fileDataSource.chunks;
    let startIndex = 0;
    let endIndex = 0; // exclusive
    const readIndex: ReadIndex = { start: null, end: null };

    for (let i = 0; i < allChunks.size; i++) {
      if (readIndex.start !== null && readIndex.end !== null) {
        break;
      }
      const rows = allChunks.get(i)!.rows;
      startIndex = endIndex;
      endIndex += rows;
      if (readIndex.start === null && start < endIndex) {
        readIndex.start = { id: i, index: startIndex };
      }
      if (readIndex.end === null && end < endIndex) {
        readIndex.end = { id: i, index: endIndex };
      }
    }
    return readIndex;
  }
}