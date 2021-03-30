import {DELETE_HISTORY_ITEM, FIRST_RENDER, GET_IMG, SET_CURRENT_PAGE, SET_IMAGES, SET_STATUS, SET_STATUS_ERROR} from "./gallery-reducer"


export const getImg = () => ({type: GET_IMG}as const)
export const isFirstRender = (flag: boolean) => ({type: FIRST_RENDER,flag}as const)
export const setGalleryStatus = (status: string) => ({type: SET_STATUS,status}as const)
export const setGalleryStatusError = (status: string) => ({type: SET_STATUS_ERROR,status}as const)
export const setImages = (data: any, time: string) => ({type: SET_IMAGES, data, time}as const)
export const deleteHistoryItem = (id: number) => ({type: DELETE_HISTORY_ITEM, id}as const)
export const setCurrentPages = (value: number) => ({type: SET_CURRENT_PAGE, value}as const)