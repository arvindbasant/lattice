import { combineReducers } from 'redux';
import counter from './counter/counter-reducer';
import flow from './flow/flow-reducer';
import { connectRouter } from 'connected-react-router';

// export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
//     counter,
//     // routing: routing as Reducer<any>
// });

export const createRootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    counter,
    flow
});