import { Action } from 'redux';
import { Dispatch } from 'redux';

export interface DispatchProps<A extends Action> {
  dispatch: Dispatch<A>;
}
