/**
 * @abstract class for reading data from any source
 * all data sources must extends DataReader and implement
 * @method read(start: number, end: number): Promise<string[][]>
 */
export abstract class DataReader {
  protected abstract read(start: number, end: number): Promise<string[][]>;
}