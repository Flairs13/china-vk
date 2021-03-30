import {spawn } from "redux-saga/effects";
import { initializeWatcher } from "../app-reducer";
import auth from '../Auth/auth-saga'
import profile from '../Profile/profile-saga'
import users from '../Users/user-saga'
import gallery from '../Gallery/gallery-saga'


export default function* rootSaga() {
   yield spawn(auth)
   yield spawn(initializeWatcher)
   yield spawn(profile)
   yield spawn(users)
   yield spawn(gallery)

}