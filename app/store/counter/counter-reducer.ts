import { CounterActions } from './counter-actions';
import { Reducer } from 'redux';
import { CounterState, DEFAULT_COUNTER_STATE } from './counter-type';

// export default function counterReducer(state: number = 0, action: IAction) {
//     if (increment.test(action)) {
//         return state + 1;
//     } else if (decrement.test(action)) {
//         return state - 1;
//     }

//     return state;
// }

const counterReducer: Reducer<CounterState> = (
    state: CounterState = DEFAULT_COUNTER_STATE,
    action: CounterActions
): CounterState => {
    switch (action.type) {
        case 'INCREMENT_COUNTER':
            return { ...state, counter: state.counter + 1 };
        case 'DECREMENT_COUNTER':
            return { ...state, counter: state.counter - 1 };
        case 'INCREMENT_IF_ODD':
            return state;
        default:
            return state;
    }
};

export default counterReducer;