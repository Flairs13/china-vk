import {call, delay, fork, put, takeEvery} from "redux-saga/effects";
import {GET_PROFILE, GET_USER_STATUS, SAVE_PHOTO, SAVE_PROFILE, UPDATE_USER_STATUS} from "./profile-reducer";
import {usersAPI} from "../../api/api-js";
import * as actions from "./profile-actions";
import {saveProfileSuccess} from "./profile-actions";
import {getAuthWorker} from "../Auth/auth-saga";


export function* getProfileWatcher() {
    yield takeEvery(GET_PROFILE, getProfileWorker)
}

export function* getProfileWorker({userId}: ReturnType<typeof actions.getProfile>) {
    if (userId) {
        const data = yield call(usersAPI.getProfile, userId)
        yield put(actions.setUserProfile(data.data))
    }


}


export function* getUserStatusWatcher() {
    yield takeEvery(GET_USER_STATUS, getUserStatusWorker)
}

export function* getUserStatusWorker({userId}: ReturnType<typeof actions.getUserStatus>) {
    const data = yield call(usersAPI.getStatus, userId)
    yield put(actions.setUserStatus(data))
}


export function* updateUserStatusWatcher() {
    yield takeEvery(UPDATE_USER_STATUS, updateUserStatusWorker)
}

export function* updateUserStatusWorker({status}: ReturnType<typeof actions.updateUserStatus>) {
    const response = yield call(usersAPI.updateStatus, status)
    if (response.data.resultCode === 0) {
        yield put(actions.setUserStatus(status))
    }
}


export function* savePhotoWatcher() {
    yield takeEvery(SAVE_PHOTO, savePhotoWorker)
}

export function* savePhotoWorker({photo}: ReturnType<typeof actions.savePhoto>) {
    let response = yield call(usersAPI.savePhoto, photo)
    if (response.data.resultCode === 0) {
        yield put(actions.savePhotoSuccess(response.data.data.photos))
        yield getAuthWorker()
    }
}


export function* saveProfileWatcher() {
    yield takeEvery(SAVE_PROFILE, saveProfileWorker)
}

export function* saveProfileWorker({values}: ReturnType<typeof actions.saveProfile>) {
    let response = yield call(usersAPI.saveProfile, values)
    if (response.data.resultCode === 0) {
        yield put(saveProfileSuccess())
        yield delay(4000)
        yield put(saveProfileSuccess())
    }
}


export default function* rootSaga() {
    yield fork(getProfileWatcher);
    yield fork(getUserStatusWatcher)
    yield fork(updateUserStatusWatcher)
    yield fork(savePhotoWatcher)
    yield fork(saveProfileWatcher)
}