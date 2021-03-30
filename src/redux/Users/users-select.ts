import {AppStateType} from "../redux-store";

export const selectTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}


export const selectAllUsersCount = (state: AppStateType) => {
    return state.usersPage.allUsersCount
}

export const selectFriendsCount = (state: AppStateType) => {
    return state.usersPage.friendsCount
}

export const selectRandomFriends = (state: AppStateType) => {
    return state.usersPage.randomFriends
}