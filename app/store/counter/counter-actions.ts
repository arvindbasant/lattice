import { actionCreator } from '../utils/action-creator';
import { ActionUnion } from '../utils/action-union';
import { put, takeEvery } from 'redux-saga/effects';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export const counterActions = {
    incrementCounter: () => actionCreator(INCREMENT_COUNTER),
    decrementCounter: (counter: number) => actionCreator(DECREMENT_COUNTER, {counter}),
    incrementIfOdd: (counter: number) => actionCreator(INCREMENT_IF_ODD, { counter})
};

export type CounterActions = ActionUnion<typeof counterActions>;

const incrementIfOdd = function* (action: ReturnType<typeof counterActions['incrementIfOdd']>): IterableIterator<any> {
    const { payload: { counter } } = action;
    try {
        if (counter % 2 === 0) {
            return;
        }
        yield put(counterActions.incrementCounter());
    } catch (err) {
        //
    }

};
export default function* counterSaga() {
    yield takeEvery(INCREMENT_IF_ODD, incrementIfOdd);
}

// export function incrementIfOdd() {
//   return (dispatch: Function, getState: Function) => {
//     const { counter } = getState();

//     if (counter % 2 === 0) {
//       return;
//     }

//     dispatch(increment());
//   };
// }

// export function incrementAsync(delay: number = 1000) {
//   return (dispatch: Function) => {
//     setTimeout(() => {
//       dispatch(increment());
//     }, delay);
//   };
// }
