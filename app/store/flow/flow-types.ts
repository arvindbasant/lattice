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

export enum WidgetCategory {
  Import = 'import',
  Transform = 'transform',
  Persist = 'persist',
}

export interface Widget {
  id: string;
  name: string;
  category: WidgetCategory;
  widgetRect: WidgetRect;
  destinations: string[];
}

export interface ImportWidget extends Widget {
  dataSource?: FileDataSource | SQLDataSource;
}

export interface TransformWidget extends Widget {
}

export interface PersistWidget extends Widget {
}

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
  connection: SQLConnectionDetails;
  rows: number;
  responseType: 'table' | 'json';
}

export class Expression {

}

export type AnyWidget = ImportWidget | TransformWidget | PersistWidget;

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