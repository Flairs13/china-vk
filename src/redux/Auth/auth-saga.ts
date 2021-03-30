import {call, fork, put, takeEvery} from 'redux-saga/effects'
import {DELETE_LOGIN, LOGIN_OUT, SET_LOGIN_AUTH} from './auth-reducer'
import {authApi, usersAPI} from "../../api/api-js";
import * as actions from "./auth-actions";
import {getAllFriendsCount, getAllUsersCount} from '../Users/user-saga';


export function* authWatcher() {
    yield takeEvery(SET_LOGIN_AUTH, setLoginWorker)
    yield takeEvery(LOGIN_OUT, logoutWorker)
}


export function* getAuthWorker() {
    const data = yield call(authApi.getAuth)
    if (data.resultCode === 0) {
        yield put(actions.setUserData(data.data.id, data.data.login, data.data.email, true))
        yield getProfilePhoto(data.data.id)
        yield getAllUsersCount()
        yield getAllFriendsCount()
    }

}

export function* getProfilePhoto(userId: number) {
    const data = yield call(usersAPI.getProfile, userId)
    yield put(actions.setProfilePhoto(data.data.photos.small))
    console.log(data.data.photos.small)
}


type LoginWorker = {
    payload: {
        email: string
        password: string
        rememberMe: boolean
        captcha: string
    }
    type: string
}

export function* setLoginWorker({payload: {email, password, rememberMe,captcha}}: LoginWorker) {
    const {response,error} = yield call(authApi.login, email, password, rememberMe,captcha)
    if (response) {
        if (response.data.resultCode === 0) {
            yield getAuthWorker()
        } else if (response.data.resultCode === 10){
            yield captchaWorker()
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        yield put(actions.setErrorMessages(message))
    } else if (error){
        console.log(error);
    }
}

export function* captchaWorker () {
    const {response,error} = yield call(authApi.getCaptcha)
    if (response) {
        yield put(actions.setCaptcha(response.data.url))
    } else if (error){
        console.log(error)
    }
}



export function* logoutWorker() {
    let data = yield call(authApi.logout)
    if (data.resultCode === 0) {
        yield put({type: DELETE_LOGIN})
    }
}

export default function* rootSaga() {
    yield fork(authWatcher);
}
