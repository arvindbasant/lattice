import { Reducer } from 'redux';
import { FlowActions } from './flow-actions';
import { FlowState, DEFAULT_FLOW_STATE, AnyWidget } from './flow-types';

const flowReducer: Reducer<FlowState> = (
  state: FlowState = DEFAULT_FLOW_STATE,
  action: FlowActions
): FlowState => {
  switch (action.type) {

    case '@data/FLOW_SET':
      const widgetNew = state.widgets.slice();
      widgetNew.splice(widgetNew.length - 1, 0, action.payload.widget);
      return {
        ...state,
        widgets: widgetNew
      };

    case '@data/FLOW_UPDATE':
      const widgetsUpdated: AnyWidget[] = state.widgets.map(
        (widget: AnyWidget, i) => {
          if (widget.id === action.payload.widget.id) {
            return action.payload.widget;
          }
          return widget;
        }
      );
      return {
        ...state,
        widgets: widgetsUpdated
      };

    case '@data/WIDGET_DATA_SOURCE_SET':
      const widgetsDataSource: AnyWidget[] = state.widgets.map(
        (widget: AnyWidget, i) => {
          if (widget.id === action.payload.widgetId) {
            return {...widget, dataSource: action.payload.dataSource};
          }
          return widget;
        }
      );
      return {
        ...state,
        widgets: widgetsDataSource
      };

    default:
      return state;
  }
};

export default flowReducer;
