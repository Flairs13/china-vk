import {AppStateType} from "../redux-store";
import { createSelector } from 'reselect'
import {createDate} from "../../components/common/Data/createDate";

export const isFirstRenderSelect = (state: AppStateType) => {
    return state.galleryPage.firstRender
}

export const getImgData = (state: AppStateType) => state.galleryPage.imgData
export const getImgInfo = createSelector([getImgData],(state: any) => {
    if (state){
        return {
            url: state.images.downsized_large.url,
        }
    }

})
export const getStatusSelect = (state: AppStateType) => state.galleryPage.status
export const getStatusError = (state: AppStateType) => state.galleryPage.error
