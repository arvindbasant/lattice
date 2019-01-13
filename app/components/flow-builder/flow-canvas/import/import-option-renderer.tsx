import * as React from 'react';
import FileImport from './file-import';
import { FlowActions } from '../../../../store/flow/flow-actions';
import { Dispatch } from 'redux';

export interface ImportRendererProps {
  id: string;
  type: string;
  dispatch: Dispatch<FlowActions>;
}

export const ImportOptionRenderer = (props: ImportRendererProps) => {
  switch (props.type) {
    case 'file':
      return <FileImport id={props.id} dispatch={props.dispatch}/>;
    default:
      return null;
  }
};