import {connect} from "react-redux";
import React from "react";
import UsersFunc from "./UsersFunc";
import {UserType} from "../../Types/Types";
import {AppStateType} from "../../redux/redux-store";
import {follow, getCurrentPageUsers, getUsers, setPortionNumber, unFollow} from "../../redux/Users/users-action";
import {Route} from "react-router-dom";
import {compose} from "redux";
import {selectAllUsersCount, selectFriendsCount} from "../../redux/Users/users-select";


type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number, whatUsers: boolean | null) => void
    getCurrentPageUsers: (pageNumber: number, pageSize: number,whatUsers: boolean | null) => void
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setPortionNumber: (number: number) => void
}

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    followingInProgress: Array<number>
    paginationSize: number
    users: Array<UserType>
    allUsersCount: number
    friendsCount: number
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const UsersAPI: React.FC<PropsType> = (props) => {

    return (

        <>
            <Route exact path='/users' render={() => <UsersFunc
                whatFriends={null}
                isFetching={props.isFetching}
                getCurrentPageUsers={props.getCurrentPageUsers}
                getUsers={props.getUsers}
                totalUsersCount={props.totalUsersCount}
                pageSize={props.pageSize}
                users={props.users}
                currentPage={props.currentPage}
                followingInProgress={props.followingInProgress}
                followUser={props.follow}
                unFollowUser={props.unFollow}
                paginationSize={props.paginationSize}
                allUsersCount={props.allUsersCount}
                friendsCount={props.friendsCount}
                setPortionNumber={props.setPortionNumber}


            />}/>
            <Route path='/users/friends' render={() => <UsersFunc
                getCurrentPageUsers={props.getCurrentPageUsers}
                whatFriends={true}
                isFetching={props.isFetching}
                getUsers={props.getUsers}
                totalUsersCount={props.totalUsersCount}
                pageSize={props.pageSize}
                users={props.users}
                currentPage={props.currentPage}
                followingInProgress={props.followingInProgress}
                followUser={props.follow}
                unFollowUser={props.unFollow}
                paginationSize={props.paginationSize}
                allUsersCount={props.allUsersCount}
                friendsCount={props.friendsCount}
                setPortionNumber={props.setPortionNumber}

            />}/>
       </>
    )

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        paginationSize: state.usersPage.paginationSize,
        allUsersCount: selectAllUsersCount(state),
        friendsCount: selectFriendsCount(state),
    }
}


const usersContainer = compose(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        getUsers,
        follow,
        unFollow,
        getCurrentPageUsers,
        setPortionNumber,
    }),
)(UsersAPI)

export default usersContainer

