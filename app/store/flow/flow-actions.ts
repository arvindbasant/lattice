import { AnyWidget, FileDataSource } from './flow-types';
import { actionCreator } from '../utils/action-creator';
import { ActionUnion } from '../utils/action-union';

export const FLOW_ACTIONS = {
  setFlow: (widget: AnyWidget) => actionCreator('@data/FLOW_SET', {widget}),
  updateFlow: (widget: AnyWidget) => actionCreator('@data/FLOW_UPDATE', {widget}),
  setWidgetDataSource: (widgetId: string, dataSource: FileDataSource) => actionCreator('@data/WIDGET_DATA_SOURCE_SET', {widgetId, dataSource}),
};

export type FlowActions = ActionUnion<typeof FLOW_ACTIONS>;