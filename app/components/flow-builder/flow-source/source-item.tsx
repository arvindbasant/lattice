import * as React from 'react';
import { ConnectDragPreview, ConnectDragSource, DragSource, DragSourceConnector, DragSourceMonitor, DragSourceSpec } from 'react-dnd';
import { Icon, Tooltip } from 'antd';

import * as styles from './source-item.scss';

interface FlowSourceProps {
  discriminator: 'IMPORT_WIDGET' | 'TRANSFORM_WIDGET' | 'PERSIST_WIDGET';
  name: string;
  icon: string;
  onDrop: any;
}

interface SourceProps {
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
}

type Props = FlowSourceProps & SourceProps;
const source: DragSourceSpec<FlowSourceProps, {}> = {
  beginDrag(props: FlowSourceProps) {
    return {name: props.name, discriminator: props.discriminator};
  },

  endDrag(props: FlowSourceProps, monitor: DragSourceMonitor) {
    if (!monitor!.didDrop()) {
      return;
    }
    const item = monitor!.getDropResult();
    props.onDrop(item);
  }
};

function collector(connect: DragSourceConnector, monitor: DragSourceMonitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class SourceItem extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const {name, icon, connectDragSource} = this.props;
    return connectDragSource(
      <div className={styles.widgetItem}>
        <div className={styles.widgetIcon}>
          <Tooltip placement="top" title={name}>
            <Icon type={icon}/>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default DragSource<FlowSourceProps>(typeof SourceItem, source, collector)(SourceItem);
