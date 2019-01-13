import { CounterState, DEFAULT_COUNTER_STATE } from './counter/counter-type';
import { FlowState, DEFAULT_FLOW_STATE } from './flow/flow-types';

export interface ApplicationState {
    counter: CounterState;
    // login: LoginState;
    flow: FlowState;
}

export const initialAppState: ApplicationState = {
    counter: DEFAULT_COUNTER_STATE,
    // login: DEFAULT_LOGIN_STATE,
    flow: DEFAULT_FLOW_STATE,
};
