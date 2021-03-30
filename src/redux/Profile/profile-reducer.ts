
import {usersAPI} from "../../api/api-js";
import {PhotosType, ProfileType} from "../../Types/Types";
import * as actions from './profile-actions'

export const ADD_POST = 'ADD-POST'
export const DELETE_POST = 'DELETE-POST'
export const SET_USER_PROFILE = 'SET_USER_PROFILE'
export const SET_USER_STATUS = 'SET_USER_STATUS'
export const SET_PHOTO_SUCCESS = 'SET_PHOTO_SUCCESS'
export const GET_PROFILE = 'GET_PROFILE'
export const GET_USER_STATUS = 'GET_USER_STATUS'
export const UPDATE_USER_STATUS = 'UPDATE_USER_STATUS'
export const SAVE_PHOTO = 'SAVE_PHOTO'
export const SAVE_PROFILE = 'SAVE_PROFILE'
export const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS'

type Posts = {
    id: number
    payload: string | object
    date: string
}
let initialState = {
    posts: [] as Array<Posts>,
    profile: null as ProfileType | null,
    status: '',
    isSaveProfile: false,
    // photos: null as PhotosType | null
}

let postId = 1

type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionType): InitialStateType => {


    switch (action.type) {
        case ADD_POST: {
            return {
                ...state , posts: [{id: postId++, payload: action.newPost, date: action.date},...state.posts,]
            }
        }

        case DELETE_POST: {
            const lw = state.posts.findIndex(w => w.id === action.id )
            return  {
                ...state, posts: [
                    ...state.posts.slice(0,lw),
                    ...state.posts.slice(lw + 1),
                ]
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state, profile: action.profile
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state, status: action.status,
            }
        }
        case SET_PHOTO_SUCCESS: {
            return {
                ...state, profile: {...state.profile, photos: action.photo} as ProfileType
            }
        }

        case SAVE_PROFILE_SUCCESS: {
            return {
                ...state, isSaveProfile: !state.isSaveProfile
            }
        }

        default: return state
    }




}

type ActionType = ReturnType<InferValueType<typeof actions>>
type InferValueType<T> = T extends {[key: string]: infer U} ? U : never







// export const getProfile = (userId: number) => async (dispatch: any) => {
//     const data = await usersAPI.getProfile(userId)
//         dispatch(actions.setUserProfile(data.data))
//
// }

// export const getUserStatus = (userId: number) => async (dispatch: any) => {
//    const data =  await usersAPI.getStatus(userId)
//         dispatch(actions.setUserStatus(data))
// }

// export const updateUserStatus = (status: string) => async (dispatch: any) => {
//    const response = await usersAPI.updateStatus(status)
//         if (response.data.resultCode === 0){
//             dispatch(actions.setUserStatus(status))
//         }
//
// }

// export const savePhoto = (photo: PhotosType) => async (dispatch: any) => {
//       let response = await usersAPI.savePhoto(photo)
//         if (response.data.resultCode === 0){
//             dispatch(actions.savePhotoSuccess(response.data.data.photos))
//         }
//
// }

// export const saveProfile = (profile: ProfileType) => async (dispatch: any) => {
//     let response = await usersAPI.saveProfile(profile)
//     if (response.data.resultCode === 0){
//         // dispatch(savePhotoSuccess(response.data.data.photos))
//     }
//
// }

export default profileReducer