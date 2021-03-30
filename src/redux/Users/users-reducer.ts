import {UserType} from "../../Types/Types";
import * as actions from "./users-action";



export const FOLLOW = 'FOLLOW'
export const UNFOLLOW = 'UNFOLLOW'
export const SET_USERS = 'SET_USERS'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
export const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
export const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'
export const GET_USERS = 'GET_USERS'
export const GET_CURRENT_PAGE_USERS = 'GET_CURRENT_PAGE'
export const GET_USERS_SUBS = 'GET_USERS_SUBS'
export const SET_USERS_SUB = 'SET_USERS_SUB'
export const GET_USERS_COUNT = 'GET_USERS_COUNT'
export const IS_FRIENDS = 'IS_FRIENDS'
export const SET_FRIENDS_COUNT = 'SET_FRIENDS_COUNT'
export const SET_ALL_USERS_COUNT = 'SET_ALL_USERS_COUNT'
export const GET_RANDOM_FRIENDS = 'GET_RANDOM_FRIENDS'
export const SET_RANDOM_FRIENDS = 'SET_RANDOM_FRIENDS'
export const SET_PORTION_NUMBER = 'SET_PORTION_NUMBER'



let initialState = {
    users: [] as Array<UserType>,
    randomFriends: [] as Array<UserType>,
    isUserSubs: null as boolean | null,
    friendsCount: 0,
    pageSize: 10,
    totalUsersCount: 0,
    allUsersCount: 0,
    paginationSize: 10,
    portionNumber: 1,
    currentPage: 1 ,
    isFriends: null as boolean | null,
    isFetching: false,
    followingInProgress: [] as Array<number>
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state, users: state.users.map ((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        }

        case UNFOLLOW: {
            return {
                ...state, users: state.users.map ((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        }

        case SET_USERS: {
            return {...state, users: [...action.users]}
        }

        case SET_USERS_SUB: {
            return {
                ...state, isUserSubs: action.subs
            }
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_COUNT: {

            return {...state, totalUsersCount: action.currentTotalCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }

        case IS_FRIENDS: {
            return  {
                ...state, isFriends: action.boolean
            }
        }

        case SET_FRIENDS_COUNT: {
            return {
                ...state, friendsCount: action.count
            }
        }

        case SET_ALL_USERS_COUNT: {
            return {
                ...state, allUsersCount: action.count
            }
        }

        case SET_RANDOM_FRIENDS: {
            return {
                ...state, randomFriends: action.randomFriends
            }
        }

        case SET_PORTION_NUMBER: {
            return  {
                ...state, portionNumber: action.number
            }
        }


        default:
            return state
    }
}
// Столкнулся с автоматической типизацией экшена функции createReducer, отложил на потом
// const authReducer = createReducer(initialState, {
//     [FOLLOW]: (state, action: ReturnType<typeof actions.follow>) => {
//         return {
//             ...state, users: state.users.map ((u) => {
//                 if (u.id === action.userId) {
//                     return {...u, followed: true}
//                 }
//                 return u
//             })
//         }
//     }
// })


type ActionType = ReturnType<InferValueType<typeof actions>>

type InferValueType<T> = T extends {[key: string]: infer U} ? U : never




// type ThunkType = ThunkAction <Promise<void>, AppStateType, unknown, ActionType>

// export const getUsers = (currentPage: number, pageSize: number): ThunkType  => async (dispatch) => {
//     dispatch (actions.toggleIsFetching (true))
//     let data = await usersAPI.getUsers (currentPage, pageSize)
//
//     dispatch (actions.toggleIsFetching (false))
//     dispatch (actions.setUsers (data.items))
//     dispatch (actions.setTotalCount (data.totalCount))
//
// }

// export const getCurrentPageUsers = (pageNumber: number, pageSize: number): ThunkType  => async (dispatch) => {
//     dispatch (actions.setCurrent (pageNumber));
//     dispatch (actions.toggleIsFetching (true))
//     let data = await usersAPI.getUsers (pageNumber, pageSize)
//
//     dispatch (actions.toggleIsFetching (false))
//     dispatch (actions.setUsers (data.items))
//
// }

// const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, action: any) => {
//     dispatch (actions.toggleFollowingProgress (true, userId))
//     const data = await apiMethod(userId)
//     if (data.resultCode === 0) {
//         dispatch (action(userId))
//     }
//     dispatch (actions.toggleFollowingProgress (false, userId))
// }
//
// export const followUser = (userId: number): ThunkType => async (dispatch) => {
//      followUnfollowFlow(dispatch, userId, usersAPI.deleteUsersSubs, actions.unFollow )
// }
//
// export const unFollowUser = (userId: number): ThunkType => async (dispatch) => {
//       followUnfollowFlow(dispatch, userId, usersAPI.postUsersSubs, actions.follow)
// }

export default usersReducer