import {fork,call,throttle, put} from "redux-saga/effects";
import { galleryApi } from "../../api/api-js";
import {createDate} from "../../components/common/Data/createDate";
import {GET_IMG} from "./gallery-reducer";
import * as actions from "./gallery-action"


export function* getImgWatcher() {
    yield throttle(500, GET_IMG, getImgWorker)
}

export function* getImgWorker() {
    yield put(actions.setGalleryStatus('loading'))
    const {response,error} = yield call(galleryApi.getImages)
    if (response) {
        let time = createDate()
       yield put(actions.setImages(response.data.data, time))
    } else if (error){
        actions.setGalleryStatusError(error)
    }
    yield put(actions.setGalleryStatus('complete'))
}



export default function* rootSaga () {
    yield fork(getImgWatcher)
}