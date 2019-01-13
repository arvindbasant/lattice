import * as React from 'react';
import { PersistWidget } from '../../../../store/flow/flow-types';
import Draggable, { DraggableData } from 'react-draggable';
import { FlowActions, FLOW_ACTIONS } from '../../../../store/flow/flow-actions';
import { Dispatch } from 'redux';

interface PersistWidgetProps {
  widget: PersistWidget;
  dispatch: Dispatch<FlowActions>;
}

class Persist extends React.Component<PersistWidgetProps> {

  constructor(props: PersistWidgetProps) {
    super(props);
    this.handleDrag = this.handleDrag.bind(this);
  }

  public render() {
    const {name} = this.props.widget;
    const {x, y} = this.props.widget.widgetRect.point;
    return (
      <Draggable
        position={{x, y}}
        onDrag={this.handleDrag}
        bounds={'.Pane1'}
      >
        <div style={{height: 50, width: 120, borderRadius: '3px', boxShadow: '1px 1px 1px #caced7', border: '1px solid #caced7'}}>
          {name}
          <div style={{height: 8, width: 8, borderRadius: 4, backgroundColor: '#caced7', position: 'absolute', top: 21, left: -4}} />
        </div>
      </Draggable>
    );
  }

  private handleDrag(e: React.MouseEvent<HTMLElement>, data: DraggableData) {
    const currentWidget: PersistWidget = this.props.widget;
    const updatedWidget: PersistWidget = {...currentWidget, widgetRect: {...currentWidget.widgetRect, point: {x: data.x, y: data.y}}};
    this.props.dispatch(FLOW_ACTIONS.updateFlow({...updatedWidget}));
  }
}

export default Persist;
