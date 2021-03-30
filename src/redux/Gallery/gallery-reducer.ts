import * as actions from "./gallery-action"


export const SET_IMAGES = 'gallery-reducer/SET_IMAGES'
export const DELETE_HISTORY_ITEM = 'gallery-reducer/DELETE_HISTORY_ITEM'
export const SET_CURRENT_PAGE = 'gallery-reducer/SET_CURRENT_PAGE'
export const GET_IMG = 'gallery-reducer/GET_IMG'
export const FIRST_RENDER = 'gallery-reducer/FIRST_RENDER'
export const SET_STATUS = 'gallery-reducer/SET_STATUS'
export const SET_STATUS_ERROR = 'gallery-reducer/SET_STATUS_ERROR'


let initialState = {
    imgData: null,
    galleryHistory: [] as Array<object>,
    pageSize: 4,
    currentPage: 1,
    status: '',
    error: null as null | string,
    firstRender: true,
}


type InitialStateType = typeof initialState



const galleryReducer = (state = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case SET_IMAGES: {
            return {
                ...state,
                imgData: action.data,
                galleryHistory: [...state.galleryHistory, {url: action.data.image_url, time: action.time, imgName: action.data.username, id: state.galleryHistory.length}]
            }
        }

        case DELETE_HISTORY_ITEM: {
            const lw = state.galleryHistory.findIndex ((w: any) => w.id === action.id)
            return {
                ...state,
                galleryHistory: [
                    ...state.galleryHistory.slice (0, lw),
                    ...state.galleryHistory.slice (lw + 1),
                ]
            }
        }

        case SET_CURRENT_PAGE: {
            return {
                ...state, currentPage: action.value
            }
        }

        case FIRST_RENDER: {
            return {
                ...state, firstRender: action.flag
            }
        }

        case SET_STATUS: {
            return {
                ...state, status: action.status
            }
        }

        case SET_STATUS_ERROR: {
            return {
                ...state, error: action.status
            }
        }

        default:
            return state

    }

}

type ActionType = ReturnType<InferValueType<typeof actions>>
type InferValueType<T> = T extends {[key: string]: infer U} ? U : never






export default galleryReducer