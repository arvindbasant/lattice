import { actionCreator } from '../utils/action-creator';
import { ActionUnion } from '../utils/action-union';

export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const TEST = 'TEST';
export const loginAction = {
    // test: () => actionCreator(TEST),
    loginSubmit: ({username, password}: {username: string, password: string}) => actionCreator(LOGIN_SUBMIT, { username, password}),
    loginSuccess: ({username, fullname}: {username: string, fullname: string}) => actionCreator(LOGIN_SUCCESS, {username, fullname}),
};

export type LoginActions = ActionUnion<typeof loginAction>;
