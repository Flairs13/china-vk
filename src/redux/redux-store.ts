import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./Profile/profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./Users/users-reducer";
import authReducer from "./Auth/auth-reducer";
import thunk from "redux-thunk";
import CreateSagaMiddleware from 'redux-saga'
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";
import galleryReducer from "./Gallery/gallery-reducer";
import rootSaga from "./Sagas/root-saga";



let reducers = combineReducers ({
                                    profilePage: profileReducer,
                                    dialogsPage: dialogsReducer,
                                    usersPage: usersReducer,
                                    auth: authReducer,
                                    form: formReducer,
                                    appPage: appReducer,
                                    galleryPage: galleryReducer

                                })


type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>

const sagaMiddleware = CreateSagaMiddleware()

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore (reducers, composeEnhancers (applyMiddleware (sagaMiddleware,thunk)))
sagaMiddleware.run(rootSaga)



// @ts-ignore
window.store = store

export default store