import * as React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetConnector, DropTargetMonitor, DropTargetSpec } from 'react-dnd';
import { Dispatch } from 'redux';
import { FlowActions } from '../../../store/flow/flow-actions';
import { AnyWidget } from '../../../store/flow/flow-types';
import FlowCanvas from '../flow-canvas';
import * as styles from './flow-target.scss';

interface FlowTargetProps {
  connectDropTarget?: ConnectDropTarget;
  isOver?: boolean;
  widgets: AnyWidget[];
  dispatch: Dispatch<FlowActions>;
}

const targetSpecification: DropTargetSpec<FlowTargetProps> = {
  drop(
    props: FlowTargetProps,
    monitor: DropTargetMonitor,
    component: React.Component<FlowTargetProps, {}>) {

    const clientOffset = monitor.getClientOffset();
    // const initialSourceClientOffset = monitor.getInitialSourceClientOffset();
    // const initialClientOffset = monitor.getClientOffset();
    // const differenceFromInitialOffset = monitor.getDifferenceFromInitialOffset();

    // console.log('getClientOffset', clientOffset);
    // console.log('getInitialClientOffset', initialClientOffset);
    // console.log('getInitialSourceClientOffset', initialSourceClientOffset);
    // console.log('getDifferenceFromInitialOffset', differenceFromInitialOffset);

    const pos = {x: clientOffset!.x, y: clientOffset!.y};
    const item = (monitor.getItem() as any);
    // console.log(item);
    return {pos, item};
  },
};

function dropTargetCollector(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

class FlowTarget extends React.Component<FlowTargetProps, {}> {

  constructor(props: FlowTargetProps) {
    super(props);
  }

// ref forwarding
// https://github.com/react-dnd/react-dnd/issues/998
  public render() {
    const {connectDropTarget} = this.props;
    // console.log(this.props.widgets);
    return connectDropTarget!(
      <div id={'canvas-container'} className={styles.flowTarget}>
        <FlowCanvas widgets={this.props.widgets} dispatch={this.props.dispatch}/>
      </div>
    );
  }
}

export default DropTarget(
  typeof FlowTarget, targetSpecification, dropTargetCollector)(FlowTarget);
