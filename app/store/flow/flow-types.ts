import { getRandomString } from '../../utils';

export type fileType = 'csv' | 'tsv' | 'json' | 'unknown';
export type colType = 'boolean' | 'string' | 'number' | 'datetime' | 'decimal';

export interface Vector2D {
  x: number;
  y: number;
}

export interface WidgetRect {
  point: Vector2D;
  height: number;
  width: number;
}

export interface WidgetStatus {
  active: boolean;
  preview: boolean;
  processing: boolean;
  isValid: boolean;
}

export const DEFAULT_WIDGET_STATUS: WidgetStatus = {
  active: false,
  preview: false,
  processing: false,
  isValid: false
};

export interface Widget {
  id: string;
  name: string;
  // category: WidgetCategory;
  widgetRect: WidgetRect;
  destinations: string[];
  status: WidgetStatus;
}

export type AnyDataSource = FileDataSource | SQLDataSource;
export interface ImportWidget extends Widget {
  discriminator: 'IMPORT_WIDGET';
  dataSource?: AnyDataSource;
}

export interface TransformWidget extends Widget {
  discriminator: 'TRANSFORM_WIDGET';

}

export interface PersistWidget extends Widget {
  discriminator: 'PERSIST_WIDGET';

}

export type AnyWidget = ImportWidget | TransformWidget | PersistWidget;

export interface ColDef {
  columnName: string;
  tittle: string;
  type: colType | undefined;
  index: number;
  displayIndex: number;
  display: boolean;
  source: 'initial' | 'expanded';
  expandedFormula?: Expression;
  isValid: boolean;
  isSortable?: boolean;
}

export interface ChunkDef {
  startCursor: number;
  endCursor: number;
  rows: number;
}

export interface DataSource {
  isValid: boolean;
  columns: ColDef[];
}

export interface FileDataSource extends DataSource {
  discriminator: 'FILE_DATA_SOURCE';
  path: string;
  fileType: fileType;
  bufferSize: number;
  rows: number;
  chunks: Map<number, ChunkDef>;
}

export interface SQLConnectionDetails {
  name: string;
  serverUrl: string;
  userName: string;
  password: string;
}

export interface SQLDataSource extends DataSource {
  discriminator: 'SQL_DATA_SOURCE';
  connection: SQLConnectionDetails;
  rows: number;
  responseType: 'table' | 'json';
}

export class Expression {

}

export interface FlowState {
  flowId: string;
  name: string;
  widgets: AnyWidget[];
}

export const DEFAULT_FLOW_STATE: FlowState = {
  flowId: getRandomString(),
  name: 'daily BSE data flow',
  widgets: [],
};