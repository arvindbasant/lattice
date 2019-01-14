import * as React from 'react';
import * as styles from './flow-source.scss';
import SourceItem from './source-item';

interface FlowSourceProps {
  flowSources: Array<{ discriminator: 'IMPORT_WIDGET' | 'TRANSFORM_WIDGET' | 'PERSIST_WIDGET'; name: string; icon: string }>;
  handleDrop: (item: any) => void;
}

const FlowSource = (props: FlowSourceProps) => {
  const importSourceItems = props.flowSources
    .filter(source => source.discriminator === 'IMPORT_WIDGET')
    .map((val: { discriminator: 'IMPORT_WIDGET' | 'TRANSFORM_WIDGET' | 'PERSIST_WIDGET'; name: string; icon: string }, key) => {
      return (
        <li key={key}>
          <SourceItem
            onDrop={props.handleDrop}
            discriminator={val.discriminator}
            name={val.name}
            icon={val.icon}
          />
        </li>
      );
    });
  const transformSourceItems = props.flowSources
    .filter(source => source.discriminator === 'TRANSFORM_WIDGET')
    .map((val, key) => {
      return (
        <li key={key}>
          <SourceItem
            onDrop={props.handleDrop}
            discriminator={val.discriminator}
            name={val.name}
            icon={val.icon}
          />
        </li>
      );
    });
  const persistSourceItems = props.flowSources
    .filter(source => source.discriminator === 'PERSIST_WIDGET')
    .map((val, key) => {
      return (
        <li key={key}>
          <SourceItem
            onDrop={props.handleDrop}
            discriminator={val.discriminator}
            name={val.name}
            icon={val.icon}
          />
        </li>
      );
    });

  return (
    <div className={styles.widgetDock}>
      <div className={styles.widgetItems}>
        <div className={styles.widgetTitle}>Import</div>
        <ul>{importSourceItems}</ul>
      </div>
      <div className={styles.widgetItems}>
        <div className={styles.widgetTitle}>TRANSFORM</div>
        <ul>{transformSourceItems}</ul>
      </div>
      <div className={styles.widgetItems}>
        <div className={styles.widgetTitle}>PERSIST</div>
        <ul>
          {persistSourceItems}
        </ul>
      </div>
    </div>
  );
};

export default FlowSource;
