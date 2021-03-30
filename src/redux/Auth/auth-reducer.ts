import {createReducer} from "@reduxjs/toolkit";
import * as actions from "./auth-actions"


export const SET_USER_DATA = 'auth-reducer/SET_USER_DATA'
export const SET_LOGIN_AUTH = 'auth-reducer/SET_LOGIN_AUTH'
export const LOGIN_OUT = 'auth-reducer/LOGIN_OUT'
export const DELETE_LOGIN = 'auth-reducer/DELETE_LOGIN'
export const SET_PROFILE_PHOTO = 'auth-reducer/SET_PROFILE_PHOTO'
export const SET_ERROR_MESSAGES = 'auth-reducer/SET_ERROR_MESSAGES'
export const SET_CAPTCHA = 'auth-reducer/SET_CAPTCHA'

let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    messages: null as string | null,
    isAuth: false,
    photo: null as string | null,
    captcha: null as string | null,
}

const authReducer = createReducer(initialState, {
    [SET_USER_DATA]: (state, action: ReturnType<typeof actions.setUserData>) => {
        return {...state, ...action.data, isAuth: action.data.isAuth}
    },
    [SET_PROFILE_PHOTO]:(state, action: ReturnType<typeof actions.setProfilePhoto>) => {
        return {...state, photo: action.photo }
    },
    [SET_ERROR_MESSAGES]:(state,action:ReturnType<typeof actions.setErrorMessages>) => {
        return {...state, messages: action.error}
    },
    [SET_CAPTCHA]:(state,action:ReturnType<typeof actions.setCaptcha>) => {
        return {...state, captcha: action.url}
    },
    [DELETE_LOGIN]:(state) => {
        return {...state,id:null, login: null, email: null, isAuth: false,
        messages: null, captcha: null
        }
    }
})

export default authReducer