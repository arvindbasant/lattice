import * as React from 'react';
import { Point, ImportWidget } from '../../../../store/flow/flow-types';
import Draggable, { DraggableData } from 'react-draggable';
import { Dispatch } from 'redux';
import { FlowActions, FLOW_ACTIONS } from '../../../../store/flow/flow-actions';
import { ImportOptionRenderer } from './import-option-renderer';

interface ImportWidgetProps {
  widget: ImportWidget;
  drawLine: (widget: ImportWidget, pointer: Point, isDrawing: boolean) => void;
  drawn: boolean;
  dispatch: Dispatch<FlowActions>;
}

interface ImportWidgetState {
  pointer: Point;
}

class Import extends React.PureComponent<ImportWidgetProps, ImportWidgetState> {

  constructor(props: ImportWidgetProps) {
    super(props);
    this.handleDrag = this.handleDrag.bind(this);
    this.handlePointerStart = this.handlePointerStart.bind(this);
    this.handlePointerDrag = this.handlePointerDrag.bind(this);
    this.handlePointerStop = this.handlePointerStop.bind(this);
    const {point} = props.widget.widgetRect;
    this.state = {
      pointer: {x: point.x + 110, y: point.y + 15},
    };
  }

  public componentWillReceiveProps(nextProps: ImportWidgetProps) {
    const {point} = nextProps.widget.widgetRect;
    this.setState({
      pointer: {x: point.x + 110, y: point.y + 15},
    });
  }

  public render() {
    const {pointer} = this.state;
    const {x, y} = this.props.widget.widgetRect.point;
    const {id, name} = this.props.widget;
    return (
      <React.Fragment>
        <Draggable
          position={{x, y}}
          onDrag={this.handleDrag}
          bounds={'.flowCanvas'}
        >
          <div style={{height: 50, width: 120, borderRadius: '3px', boxShadow: '1px 1px 1px #caced7', border: '1px solid #caced7'}}>
            <ImportOptionRenderer id={id} type={name} dispatch={this.props.dispatch}/>
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
    const currentWidget: ImportWidget = this.props.widget;
    const updatedWidget: ImportWidget = {...currentWidget, widgetRect: {...currentWidget.widgetRect, point: {x: data.x, y: data.y}}};
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

export default Import;
