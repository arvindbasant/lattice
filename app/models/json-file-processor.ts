import { FileProcessor } from './file-processor';

export class JSONFileProcessor extends FileProcessor {
  constructor(path: string) {
    super(path);
  }

  protected merge(): void {
  }

  protected split(): void {
  }

  protected process() {
    throw new Error();
  }
}