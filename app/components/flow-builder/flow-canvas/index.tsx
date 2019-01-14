import * as React from 'react';
import { Dispatch } from 'redux';
import { FlowActions, FLOW_ACTIONS } from '../../../store/flow/flow-actions';
import { Vector2D, WidgetRect, AnyWidget } from '../../../store/flow/flow-types';
import Import from './import';
import { FlowPath } from './flow-path';
import Persist from './persist';
import Transform from './transform';

interface FlowCanvasProps {
  widgets: AnyWidget[];
  dispatch: Dispatch<FlowActions>;
}

interface FlowCanvasState {
  drawingLine: boolean;
  points: Vector2D[];
  drawn: boolean;
}

class FlowCanvas extends React.PureComponent<FlowCanvasProps, FlowCanvasState> {

  constructor(props: FlowCanvasProps) {
    super(props);
    this.state = {
      drawingLine: false,
      drawn: false,
      points: [],
    };

    this.drawLine = this.drawLine.bind(this);
  }

  public render() {
    const {widgets} = this.props;
    const {drawingLine, points} = this.state;
    const allDestinations = widgets.map((item: AnyWidget) => {
      const source = item.widgetRect.point;
      const destinations: Array<{ id: string, point: Vector2D }> = this.getDestinationDetails(item.destinations);
      return destinations.map((detail: { id: string, point: Vector2D }) => {
        return (
          <FlowPath key={detail.id} points={this.getPoints(source, detail.point, item.discriminator)} r={5}/>
        );
      });
    });
    return (
      <div className={'flowCanvas'} style={{height: '1400px', width: '1200px'}}>
        <svg className={'svg'} style={{height: '1400px', width: '1200px', position: 'absolute'}}>
          {allDestinations}
          {drawingLine && <FlowPath key={'FHDGHJ7983JHDSJD88'} points={points} r={5}/>}
        </svg>
        {
          widgets.map((item: AnyWidget, i: number) => {
              if (item.discriminator === 'IMPORT_WIDGET') {
                return (
                  <Import
                    key={i}
                    drawn={this.state.drawn}
                    widget={item}
                    drawLine={this.drawLine}
                    dispatch={this.props.dispatch}
                  />
                );
              }
              if (item.discriminator === 'TRANSFORM_WIDGET') {
                return (
                  <Transform key={i} widget={item} drawLine={this.drawLine} drawn={this.state.drawn} dispatch={this.props.dispatch}/>
                );
              }
              return (
                <Persist key={i} widget={item} dispatch={this.props.dispatch}/>
              );
            }
          )
        }
      </div>
    );
  }

  public drawLine(widget: AnyWidget, pointer: Vector2D, isDrawing: boolean) {
    this.setState(() => {
      return {
        drawingLine: isDrawing,
        points: this.getPoints(widget.widgetRect.point, pointer, widget.discriminator, true),
      };
    },            () => {
      this.drawLineOnCollision(widget, pointer);
    });
  }

  private drawLineOnCollision(sourceWidget: AnyWidget, pointer: Vector2D) {
    const targetRect: WidgetRect = {point: pointer, width: 20, height: 20};

    const {widgets} = this.props;

    widgets.forEach((currentWidget: AnyWidget) => {
      if (this.hasIntersection(currentWidget.widgetRect, targetRect)) {

        // const sourceWidget: Widget = widgets!.find(widget => widget.id === widgetId)!;
        if (sourceWidget.destinations.indexOf(currentWidget.id) === -1 && currentWidget.id !== sourceWidget.id) {
          const updatedDestinations: string[] = sourceWidget.destinations;
          updatedDestinations.push(currentWidget.id);

          const updatedWidget: AnyWidget = {...sourceWidget, destinations: updatedDestinations};
          this.props.dispatch(FLOW_ACTIONS.updateFlow({...updatedWidget}));
        }
      }
    });
  }

  private hasIntersection(r1: WidgetRect, r2: WidgetRect) {
    return !(
      r2.point.x > r1.point.x + r1.width ||
      r2.point.x + r2.width < r1.point.x ||
      r2.point.y > r1.point.y + r1.height ||
      r2.point.y + r2.height < r1.point.y
    );
  }

  private getPoints(itemSource: Vector2D, itemTarget: Vector2D, type: 'IMPORT_WIDGET' | 'TRANSFORM_WIDGET' | 'PERSIST_WIDGET', isPointer?: boolean) {
    const points: Vector2D[] = [];
    let source;
    if (type === 'TRANSFORM_WIDGET') {
      source = {x: itemSource.x + 80, y: itemSource.y + 40};
    } else {
      source = {x: itemSource.x + 120, y: itemSource.y + 25};
    }
    let target;
    if (isPointer) {
      target = {x: itemTarget.x, y: itemTarget.y + 10};
    } else {
      target = {x: itemTarget.x, y: itemTarget.y};
    }

    points.push({x: source.x, y: source.y});
    if (Math.abs(source.y - target.y) > 5) {
      const breakPoint1: Vector2D = {x: source.x + (target.x - source.x) / 2, y: source.y};
      const breakPoint2: Vector2D = {x: source.x + (target.x - source.x) / 2, y: target.y};
      points.push(breakPoint1, breakPoint2);
    }
    points.push(target);
    return points;
  }

  private getDestinationDetails = (destinations: string[]): Array<{ id: string, point: Vector2D }> => {
    const destinationDetails: Array<{ id: string, point: Vector2D }> = [];
    const {widgets} = this.props;

    destinations.map((widgetId => {
      const destinationWidget: AnyWidget = widgets.find(widget => widget.id === widgetId)!;
      if (destinationWidget.discriminator === 'PERSIST_WIDGET') {
        destinationDetails.push({
          id: widgetId,
          point: {x: destinationWidget.widgetRect.point.x, y: destinationWidget.widgetRect.point.y + 25}
        });
      }
      if (destinationWidget.discriminator === 'TRANSFORM_WIDGET') {
        destinationDetails.push({
          id: widgetId,
          point: {x: destinationWidget.widgetRect.point.x, y: destinationWidget.widgetRect.point.y + 40}
        });
      }
    }));
    return destinationDetails;
  };

}

export default FlowCanvas;
