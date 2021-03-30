import {AppStateType} from "../redux-store";

export const isAuthSelect = (state: AppStateType) => {
    return state.auth.isAuth
}

export const messagesErrorSelect = (state:AppStateType) => {
    return state.auth.messages
}

export const captchaSelect = (state:AppStateType) => {
    return state.auth.captcha
}