import * as React from 'react';
import * as electron from 'electron';
import { FLOW_ACTIONS, FlowActions } from '../../../../store/flow/flow-actions';
import { Dispatch } from 'redux';
import * as fs from 'fs';
import { message } from 'antd';
import { CSVFileProcessor } from '../../../../models/csv-file-processor';
import { FileDataSource } from '../../../../store/flow/flow-types';
import { BarLoader } from 'react-spinners';
import FileDataReader from '../../../../models/file-data-reader';

const {dialog} = electron.remote;

export interface FileImportProps {
  id: string;
  dispatch: Dispatch<FlowActions>;
}

export interface FileImportState {
  loading: boolean;
}

const container = {
  width: '100%',
  height: '100%',
  cursor: 'pointer'
};

export default class FileImport extends React.Component<FileImportProps, FileImportState> {
  constructor(props: FileImportProps) {
    super(props);
    this.handleFileSelection = this.handleFileSelection.bind(this);
    this.state = {
      loading: false,
    };
  }

  public render() {
    const {loading} = this.state;
    return (
      <div style={container} onDoubleClick={this.handleFileSelection}>
        <BarLoader color={'#00A0E9'} loading={loading} widthUnit={'%'} width={100} height={2}/>
      </div>
    );
  }

  private handleFileSelection() {
    dialog.showOpenDialog(electron.remote.getCurrentWindow(), {properties: ['openFile']}, async (files) => {
      if (undefined === files) {
        message.warning('Please select a file.');
        return;
      }
      const file = files[0];
      const fileDetails = fs.statSync(file);
      if (!fileDetails.isFile()) {
        message.error('Not a file.');
        return;
      }
      if (0 === fileDetails.size) {
        message.error('File is empty, please select file with valid contents.', 2);
        return;
      }

      this.setState({loading: true});
      const fileProcessor: CSVFileProcessor = new CSVFileProcessor(file);
      const fds: FileDataSource = await fileProcessor.process();
      this.props.dispatch(FLOW_ACTIONS.setWidgetDataSource(this.props.id, fds));
      this.setState({loading: false});

      console.time('table');
      const fileReader = new FileDataReader(fds);
      console.log('100 rows', await fileReader.read(1500, 1550));
      console.log('100 rows', await fileReader.read(25, 50));
      console.log('100 rows', await fileReader.read(50, 75));
      console.log('100 rows', await fileReader.read(75, 100));
      console.log('100 rows', await fileReader.read(2000, 2100));
      console.log('100 rows', await fileReader.read(1500, 1550));
      console.log('100 rows', await fileReader.read(25, 50));
      console.log('100 rows', await fileReader.read(50, 75));
      console.log('100 rows', await fileReader.read(75, 100));
      console.log('100 rows', await fileReader.read(2000, 2100));console.log('100 rows', await fileReader.read(1500, 1550));
      console.log('100 rows', await fileReader.read(25, 50));
      console.log('100 rows', await fileReader.read(50, 75));
      console.log('100 rows', await fileReader.read(75, 100));
      console.log('100 rows', await fileReader.read(2000, 2100));console.log('100 rows', await fileReader.read(1500, 1550));
      console.log('100 rows', await fileReader.read(25, 50));
      console.log('100 rows', await fileReader.read(50, 75));
      console.log('100 rows', await fileReader.read(75, 100));
      console.log('100 rows', await fileReader.read(2000, 2100));console.log('100 rows', await fileReader.read(1500, 1550));
      console.log('100 rows', await fileReader.read(25, 50));
      console.log('100 rows', await fileReader.read(50, 75));
      console.log('100 rows', await fileReader.read(75, 100));
      console.log('100 rows', await fileReader.read(4500, 4600));
      console.timeEnd('table')

    });

  }
}
