import {call, fork, put, takeEvery} from "redux-saga/effects";
import {getAuthWorker} from "./Auth/auth-saga";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
const INITIALIZED = 'INITIALIZED'


let initialState = {
    initialized: false,
}

type InitialStateType = typeof initialState


const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                initialized: true,
            }
        }
        default:
            return state

    }

}

type ActionsType = ReturnType<typeof initialize>


export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})
export const initialize = () => ({type: INITIALIZED})


export function* initializeWatcher() {
    yield takeEvery(INITIALIZED, initializeWorker)
}

export function* initializeWorker() {
    yield fork(getAuthWorker)
    yield put(initializedSuccess())
}

export default appReducer




