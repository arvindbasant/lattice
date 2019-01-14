import { AnyWidget, AnyDataSource } from '../store/flow/flow-types';
import FileDataReader from '../models/file-data-reader';

export enum ServiceStatus {
  OK,
  ERROR,
  TIME_OUT
}

export type DataServiceResponse = {
  data: string[][];
  status: ServiceStatus;
};

/**
 * @class DataService: exposes a service to fetch records in pages.
 * @param start and stop indexes
 * @returns Promise of DataServiceResponse
 * @method fetch(start: number, stop: number): Promise<DataServiceResponse>
 */
export class DataService {
  private readonly widget: AnyWidget;
  constructor(widget: AnyWidget) {
    this.widget = widget;
  }

  public fetch(start: number, stop: number): Promise<DataServiceResponse> {
    return new Promise(resolve => {
      if (this.isValidRequest()) {
        if (this.widget.discriminator === 'IMPORT_WIDGET') {
          // FIXME: no bang
          const dr = createDataReader(this.widget.dataSource!);
          if (dr) {
            dr.read(start, stop)
              .then(data => {
                resolve({ data, status: ServiceStatus.OK });
              })
              .catch((err) => {
                resolve(err);
              });
          }
        }
      } else {
        resolve(this.createErrorResonse());
      }
    });
  }

  private createErrorResonse(): DataServiceResponse {
    return { data: [], status: ServiceStatus.ERROR };
  }

  private isValidRequest() {
    const { status } = this.widget;
    return status.active && status.isValid && status.preview && !status.processing;
  }
}

/**
 * @function for DataReader Factory
 * @param dataSource 
 * NOTE: as of now typescript doesn't support features like instanceOf to get the type of interface at runtime.
 * HACK: using discriminator @property for type check
 * TODO: update better runtime type check
 * @see https://stackoverflow.com/questions/14425568/interface-type-check-with-typescript
 */
function createDataReader(dataSource: AnyDataSource) {
  if (dataSource.discriminator === 'FILE_DATA_SOURCE') {
    return new FileDataReader(dataSource);
  }
  return null;
}