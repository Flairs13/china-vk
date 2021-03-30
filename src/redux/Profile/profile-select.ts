import {AppStateType} from "../redux-store";

export const selectProfile = (state: AppStateType) => {
    return state.profilePage.profile

}

export const selectIsSaveProfile = (state: AppStateType) => {
    return state.profilePage.isSaveProfile

}

export const selectPosts = (state: AppStateType) => {
    return state.profilePage.posts
}