import * as React from 'react';
import { Point, TransformWidget } from '../../../../store/flow/flow-types';
import { Dispatch } from 'redux';
import { FlowActions, FLOW_ACTIONS } from '../../../../store/flow/flow-actions';
import Draggable, { DraggableData } from 'react-draggable';

interface TransformWidgetProps {
  widget: TransformWidget;
  drawLine: (widget: TransformWidget, pointer: Point, isDrawing: boolean) => void;
  drawn: boolean;
  dispatch: Dispatch<FlowActions>;
}

interface TransformWidgetState {
  pointer: Point;
}

class Transform extends React.PureComponent<TransformWidgetProps, TransformWidgetState> {

  constructor(props: TransformWidgetProps) {
    super(props);
    this.handleDrag = this.handleDrag.bind(this);
    this.handlePointerStart = this.handlePointerStart.bind(this);
    this.handlePointerDrag = this.handlePointerDrag.bind(this);
    this.handlePointerStop = this.handlePointerStop.bind(this);
    const {point} = props.widget.widgetRect;
    this.state = {
      pointer: {x: point.x + 70, y: point.y + 30},
    };
  }

  public componentWillReceiveProps(nextProps: TransformWidgetProps) {
    const {point} = nextProps.widget.widgetRect;
    this.setState({
      pointer: {x: point.x + 70, y: point.y + 30},
    });
  }

  public render() {
    const { pointer} = this.state;
    const {x, y} = this.props.widget.widgetRect.point;
    const {name} = this.props.widget;
    return (
      <React.Fragment>
        <Draggable
          position={{x, y}}
          onDrag={this.handleDrag}
          bounds={'.flowCanvas'}
        >
          <div style={{height: 80, width: 80, borderRadius: '2px', boxShadow: '1px 1px 1px #caced7', border: '1px solid #caced7'}}>
            {name}
            <div style={{height: 8, width: 8, borderRadius: 4, backgroundColor: '#caced7', position: 'absolute', top: 36, left: -4}} />
          </div>
        </Draggable>
        <Draggable
          onStart={this.handlePointerStart}
          onDrag={this.handlePointerDrag}
          onStop={this.handlePointerStop}
          position={{x: pointer.x, y: pointer.y}}
        >
          <div style={{height: '20px', width: '20px', borderRadius: '10px', backgroundColor: '#caced7', boxShadow: '1px 1px 1px #caced7'}}/>
        </Draggable>
      </React.Fragment>
    );
  }

  private handleDrag(e: React.MouseEvent<HTMLElement>, data: DraggableData) {
    const currentWidget: TransformWidget = this.props.widget;
    const updatedWidget: TransformWidget = {...currentWidget, widgetRect: {...currentWidget.widgetRect, point: {x: data.x, y: data.y}}};
    this.props.dispatch(FLOW_ACTIONS.updateFlow({...updatedWidget}));
  }

  private handlePointerDrag(e: React.MouseEvent<HTMLElement>, data: DraggableData) {
    if (!this.props.drawn) {
      this.setState(() => {
        return {
          pointer: {x: data.x, y: data.y},
        };
      }, () => {
        this.props.drawLine(this.props.widget, this.state.pointer, true);
      });
    } else {
      this.handlePointerStop();
    }
  }

  private handlePointerStop() {
    this.props.drawLine(this.props.widget, this.state.pointer, false);
  }
  private handlePointerStart(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
  }
}

export default Transform;
