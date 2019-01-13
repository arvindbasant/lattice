import { all } from 'redux-saga/effects';
import counterSaga from './counter/counter-actions';

export default function* rootSaga() {
  yield all([
    counterSaga()
  ]);
}
