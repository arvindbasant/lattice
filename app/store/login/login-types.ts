export interface LoginState {
    userName: string;
    password: string;
    fullname: string;
}

export const DEFAULT_LOGIN_STATE: LoginState = {
    userName: '',
    password: '',
    fullname: ''
};