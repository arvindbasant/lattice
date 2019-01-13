import * as React from 'react';
import { Dispatch } from 'redux';
import { FlowActions, FLOW_ACTIONS } from '../../../store/flow/flow-actions';
import { Point, Widget, WidgetCategory, WidgetRect } from '../../../store/flow/flow-types';
import Import from './import';
import { FlowPath } from './flow-path';
import Persist from './persist';
import Transform from './transform';

interface FlowCanvasProps {
  widgets: Widget[];
  dispatch: Dispatch<FlowActions>;
}

interface FlowCanvasState {
  drawingLine: boolean;
  points: Point[];
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
    const allDestinations = widgets.map((item: Widget) => {
      const source = item.widgetRect.point;
      const destinations: Array<{ id: string, point: Point }> = this.getDestinationDetails(item.destinations);
      return destinations.map((detail: { id: string, point: Point }) => {
        return (
          <FlowPath key={detail.id} points={this.getPoints(source, detail.point, item.category)} r={5}/>
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
          widgets.map((item: Widget, i: number) => {
              if (item.category === WidgetCategory.Import) {
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
              if (item.category === WidgetCategory.Transform) {
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

  public drawLine(widget: Widget, pointer: Point, isDrawing: boolean) {
    this.setState(() => {
      return {
        drawingLine: isDrawing,
        points: this.getPoints(widget.widgetRect.point, pointer, widget.category, true),
      };
    }, () => {
      this.drawLineOnCollision(widget, pointer);
    });
  }

  private drawLineOnCollision(sourceWidget: Widget, pointer: Point) {
    const targetRect: WidgetRect = {point: pointer, width: 20, height: 20};

    const {widgets} = this.props;

    widgets.forEach((currentWidget: Widget) => {
      if (this.hasIntersection(currentWidget.widgetRect, targetRect)) {

        // const sourceWidget: Widget = widgets!.find(widget => widget.id === widgetId)!;
        if (sourceWidget.destinations.indexOf(currentWidget.id) === -1 && currentWidget.id !== sourceWidget.id) {
          const updatedDestinations: string[] = sourceWidget.destinations;
          updatedDestinations.push(currentWidget.id);

          const updatedWidget: Widget = {...sourceWidget, destinations: updatedDestinations};
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

  private getPoints(itemSource: Point, itemTarget: Point, type: WidgetCategory, isPointer?: boolean) {
    const points: Point[] = [];
    let source;
    if (type === WidgetCategory.Transform) {
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
      const breakPoint1: Point = {x: source.x + (target.x - source.x) / 2, y: source.y};
      const breakPoint2: Point = {x: source.x + (target.x - source.x) / 2, y: target.y};
      points.push(breakPoint1, breakPoint2);
    }
    points.push(target);
    return points;
  }

  private getDestinationDetails = (destinations: string[]): Array<{ id: string, point: Point }> => {
    const destinationDetails: Array<{ id: string, point: Point }> = [];
    const {widgets} = this.props;

    destinations.map((widgetId => {
      const destinationWidget: Widget = widgets.find(widget => widget.id === widgetId)!;
      if (destinationWidget.category === WidgetCategory.Persist) {
        destinationDetails.push({
          id: widgetId,
          point: {x: destinationWidget.widgetRect.point.x, y: destinationWidget.widgetRect.point.y + 25}
        });
      }
      if (destinationWidget.category === WidgetCategory.Transform) {
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
