import {PhotosType, ProfileType} from "../../Types/Types";
import {
    ADD_POST, DELETE_POST,
    GET_PROFILE,
    GET_USER_STATUS,
    SAVE_PHOTO,
    SAVE_PROFILE,
    SAVE_PROFILE_SUCCESS,
    SET_PHOTO_SUCCESS,
    SET_USER_PROFILE,
    SET_USER_STATUS,
    UPDATE_USER_STATUS
} from "./profile-reducer";


export const addPost = (newPost: string,date: string) => ({type: ADD_POST, newPost,date}as const)
export const deletePost = (id: number) => ({type: DELETE_POST,id}as const)
export const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile}as const)
export const setUserStatus = (status: string) => ({type: SET_USER_STATUS, status}as const)
export const savePhotoSuccess = (photo: PhotosType) => ({type: SET_PHOTO_SUCCESS, photo}as const)
export const getProfile = (userId: number) => ({type:GET_PROFILE,userId}as const)
export const getUserStatus = (userId: number) => ({type: GET_USER_STATUS,userId}as const)
export const updateUserStatus = (status: string) => ({type: UPDATE_USER_STATUS,status}as const)
export const savePhoto = (photo: object) => ({type: SAVE_PHOTO,photo}as const)
export const saveProfile = (values: object) => ({type: SAVE_PROFILE,values}as const)
export const saveProfileSuccess = () =>({type: SAVE_PROFILE_SUCCESS}as const)