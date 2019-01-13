import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import { FLOW_ACTIONS, FlowActions } from '../../store/flow/flow-actions';
import { FlowState, WidgetCategory, AnyWidget } from '../../store/flow/flow-types';
import { ApplicationState } from '../../store/types';
import FlowTarget from './flow-target/index';
import FlowSource from './flow-source/index';
import { getRandomString } from '../../utils';
import { FLOW_SOURCE_TYPES } from '../constants';
import * as styles from './flow.scss';
import { DispatchProps } from '../../store/utils/dispatch-props';
import { AnyAction } from 'redux';
import { DataTable } from './data-table';

type FlowProps = FlowState & DispatchProps<AnyAction>;

class FlowBuilder extends React.Component<FlowProps, any> {

  constructor(props: FlowProps) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
  }

  public render() {
    const { widgets, dispatch } = this.props;

    return (
      <div className={styles.flow}>
        <FlowSource flowSources={FLOW_SOURCE_TYPES} handleDrop={this.handleDrop} />

        <div className={styles.dataFlowContainer}>
          <SplitPane split="horizontal" minSize={'65%'}>
            <FlowTarget widgets={widgets} dispatch={dispatch} />
            <div style={{ backgroundColor: '#fff' }}>
              <DataTable />
            </div>
          </SplitPane>
        </div>
      </div>
    );
  }

  private handleDrop(item: any) {
    const widgetId: string = getRandomString();
    const widget: AnyWidget = {
      id: widgetId,
      name: item.item.name,
      category: item.item.category,
      widgetRect: item.item.category === WidgetCategory.Transform ?
        { point: { x: item.pos.x - 71 - 40, y: item.pos.y - 88 - 40 }, height: 40, width: 40 } :
        { point: { x: item.pos.x - 71 - 60, y: item.pos.y - 88 - 25 }, height: 50, width: 120 },
      destinations: []
    };
    this.props.dispatch(FLOW_ACTIONS.setFlow({ ...widget }));
  }
}

export default connect<FlowState, DispatchProps<FlowActions>>(
  (state: ApplicationState): FlowState => ({
    flowId: state.flow.flowId,
    widgets: state.flow.widgets,
    name: state.flow.name,
  })
)(DragDropContext(HTML5Backend)(FlowBuilder));
