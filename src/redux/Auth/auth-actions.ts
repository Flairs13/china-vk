import {LOGIN_OUT, SET_CAPTCHA, SET_ERROR_MESSAGES, SET_LOGIN_AUTH, SET_PROFILE_PHOTO, SET_USER_DATA} from "./auth-reducer";



export const setUserData = (id: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    data: {id, login, email, isAuth}
})

export const loginAuth = (email: string, password: number, rememberMe: boolean, captcha: string) => ({
    type: SET_LOGIN_AUTH,
    payload: {
        email,password,rememberMe,captcha
    }
})

export const loginOut = () => ({
    type: LOGIN_OUT,
})

export const setProfilePhoto = (photo: string) => ({
    type: SET_PROFILE_PHOTO,
    photo: photo,
})

export const setErrorMessages = (error: string) => ({
    type: SET_ERROR_MESSAGES,
    error: error
})
export const setCaptcha = (url: string) => ({type: SET_CAPTCHA,url})