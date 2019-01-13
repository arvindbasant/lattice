import { fork } from 'redux-saga/effects';
import counterSaga from './counter/counter-actions';

export default function* rootSaga() {
  yield [
    fork(counterSaga),
  ];
}
