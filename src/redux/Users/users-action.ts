import {UserType} from "../../Types/Types";
import {
    FOLLOW,
    GET_CURRENT_PAGE_USERS,
    GET_USERS,
    SET_CURRENT_PAGE,
    SET_TOTAL_COUNT,
    SET_USERS,
    TOGGLE_IS_FETCHING,
    TOGGLE_IS_FOLLOWING_PROGRESS,
    UNFOLLOW,
    GET_USERS_SUBS,
    SET_USERS_SUB,
    GET_USERS_COUNT,
    IS_FRIENDS,
    SET_FRIENDS_COUNT,
    SET_ALL_USERS_COUNT,
    GET_RANDOM_FRIENDS,
    SET_RANDOM_FRIENDS, SET_PORTION_NUMBER,
} from "./users-reducer";


export const follow = (userId: number) => ({type: FOLLOW,userId}as const)
export const unFollow = (userId: number) => ({type: UNFOLLOW, userId} as const)
export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users}as const)
export const setCurrent = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage}as const)
export const setTotalCount = (currentTotalCount: number) => ({type: SET_TOTAL_COUNT, currentTotalCount}as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching}as const)
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}as const)
export const getUsers = (currentPage: number, pageSize: number,whatUsers: boolean | null) => ({type:GET_USERS,currentPage,pageSize,whatUsers}as const)
export const getCurrentPageUsers = (pageNumber: number, pageSize: number,whatUsers: boolean | null) => ({type: GET_CURRENT_PAGE_USERS,pageNumber,pageSize,whatUsers}as const)
export const getUsersSubs = (userId: number) => ({type: GET_USERS_SUBS,userId}as const)
export const setUsersSubs = (subs: boolean) => ({type: SET_USERS_SUB,subs}as const)
export const getUsersCount = (count: number) => ({type: GET_USERS_COUNT,count}as const)
export const isFriends = (boolean: boolean | null) => ({type: IS_FRIENDS, boolean}as const)
export const setFriendsCount = (count: number) => ({type: SET_FRIENDS_COUNT, count}as const)
export const setAllUsersCount = (count: number) => ({type: SET_ALL_USERS_COUNT, count}as const)
export const getRandomFriends = () => ({type: GET_RANDOM_FRIENDS}as const)
export const setRandomFriends = (randomFriends: Array<UserType>) => ({type: SET_RANDOM_FRIENDS, randomFriends}as const)
export const setPortionNumber = (number: number) => ({type: SET_PORTION_NUMBER, number}as const)
