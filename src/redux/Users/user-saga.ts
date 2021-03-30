import {call, fork, put, takeEvery, throttle} from "redux-saga/effects";
import {FOLLOW, GET_CURRENT_PAGE_USERS, GET_RANDOM_FRIENDS, GET_USERS, GET_USERS_SUBS, UNFOLLOW} from "./users-reducer";
import * as actions from "./users-action";
import {usersAPI} from "../../api/api-js";
import {UserType} from "../../Types/Types";





export function* getUsersWatcher() {
    yield throttle(100,GET_USERS, getUsersWorker)

}

export function* getUsersWorker({currentPage, pageSize,whatUsers}: ReturnType<typeof actions.getUsers>) {
        yield put(actions.toggleIsFetching(true))
        const {response,error}  = yield call(usersAPI.getUsers, currentPage, pageSize, whatUsers)
        if (response){
            yield put(actions.setUsers(response.data.items))
            yield put(actions.setTotalCount(response.data.totalCount))
            yield put(actions.isFriends(whatUsers))
        } else {
            console.log(error)
        }
        yield put(actions.toggleIsFetching(false))
}





export function* getCurrentPageUsersWatcher() {
    yield takeEvery(GET_CURRENT_PAGE_USERS, getCurrentPageUsersWorker)
}

export function* getCurrentPageUsersWorker({pageNumber, pageSize,whatUsers}: ReturnType<typeof actions.getCurrentPageUsers>) {
        yield put(actions.setCurrent(pageNumber));
        yield put(actions.toggleIsFetching(true))
        let {response,error} = yield call(usersAPI.getUsers, pageNumber, pageSize,whatUsers)
        if (response){
            yield put(actions.setUsers(response.data.items))
        } else {
            console.log(error)
        }
        yield put(actions.toggleIsFetching(false))


}

export function* getAllUsersCount(){
    let {response,error} = yield call(usersAPI.getUsers, 1, 1)
    if (response){
        yield put(actions.setAllUsersCount(response.data.totalCount))
    } else {
        console.log(error)
    }
}

export function* getAllFriendsCount(){
    let {response,error} = yield call(usersAPI.getUsers, 1, 1,true)
    if (response){
        yield put(actions.setFriendsCount(response.data.totalCount))
    } else {
        console.log(error)
    }
}

export function* followWatcher() {
    yield takeEvery(FOLLOW, followWorker)
}

export function* followWorker({userId}: ReturnType<typeof actions.follow>) {

    yield put(actions.toggleFollowingProgress(true, userId))
    const {response,error} = yield call(usersAPI.postUsersSubs, userId)
    if (response){
        if (response.data.resultCode === 0) {
            yield put(actions.follow(userId))
            yield getAllFriendsCount()
        }
        yield getUsersSubsWorker({userId} as ReturnType<typeof actions.getUsersSubs>)
    } else {
        console.error(error)
    }
    yield put(actions.toggleFollowingProgress(false, userId))
}


export function* unFollowWatcher() {
    yield takeEvery(UNFOLLOW, unFollowWorker)
}

export function* unFollowWorker({userId}: ReturnType<typeof actions.unFollow>) {
    yield put(actions.toggleFollowingProgress(true, userId))
    const {response,error} = yield call(usersAPI.deleteUsersSubs, userId)
    if (response){
        if (response.data.resultCode === 0) {
            yield put(actions.unFollow(userId))
            yield getAllFriendsCount()
        }
    } else {
        console.log(error)
    }
    yield getUsersSubsWorker({userId} as ReturnType<typeof actions.getUsersSubs>)
    yield put(actions.toggleFollowingProgress(false, userId))
}


export function* getRandomFriendsWatcher() {
    yield takeEvery(GET_RANDOM_FRIENDS, getRandomFriendsWorker)
}

export function* getRandomFriendsWorker() {
    yield put(actions.toggleIsFetching(true))
    const {response,error} = yield call(usersAPI.getUsers,1,100,true)
    const arr = [] as Array<UserType>
    const randomNumber = [] as Array<number>
    if (response){
        yield put(actions.setFriendsCount(response.data.totalCount))
        if (response.data.items.length !== 0) {
            while (randomNumber.length !== response.data.totalCount && randomNumber.length < 6 ){
                let totalCount;
                if (response.data.totalCount > 100){
                    totalCount = 100
                } else {
                    totalCount = response.data.totalCount
                }
                const randomIndex = Math.floor(Math.random() * totalCount)
                if (!randomNumber.some(j => j === randomIndex)) {
                    arr.push(response.data.items[randomIndex])
                    randomNumber.push(randomIndex)
                }
            }
        }
    } else {
        console.log(error)
    }
    yield put(actions.setRandomFriends(arr))
    yield put(actions.toggleIsFetching(false))
}

export function* getUsersSubs(){
    yield takeEvery(GET_USERS_SUBS, getUsersSubsWorker)
}

export function* getUsersSubsWorker({userId}: ReturnType<typeof actions.getUsersSubs>){
    const {response,error} = yield call(usersAPI.getUsersSubs,userId)
    if (response){
        yield put(actions.setUsersSubs(response.data))
    } else {
        console.log(error)
    }

}

export default function* rootSaga() {
    yield fork(getUsersWatcher)
    yield fork(getCurrentPageUsersWatcher)
    yield fork(followWatcher)
    yield fork(unFollowWatcher)
    yield fork(getRandomFriendsWatcher)
    yield fork(getUsersSubs)
}