import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from 'react-router-dom';
import {ProfileType, UserType} from "../../Types/Types";
import {AppStateType} from "../../redux/redux-store";
import {getProfile, getUserStatus, savePhoto, updateUserStatus} from "../../redux/Profile/profile-actions";
import {follow, getRandomFriends,getUsersSubs, unFollow} from "../../redux/Users/users-action";
import {selectFriendsCount, selectRandomFriends} from "../../redux/Users/users-select";

type WithRouterMatch = {
    match: {
        isExact: boolean
        params: {
            userId: string | undefined
        }
        path: string
        url: string
    }
}

type MapStatePropsType = {
    authId: number | null
    profilePage: ProfileType | null
    userStatus: string
    auth: boolean
    users: Array<UserType>
    followingInProgress: Array<number>
    friendsCount: number
    randomFriends: Array<UserType>
}

type MapDispatchPropsType = {
    getProfile: (userId: number | null) => void
    getUsersSubs: (userId: number | null) => void
    getUserStatus: (userId: number | null) => void
    updateUserStatus: (status: string) => void
    savePhoto: (obj: object) => void
    saveProfile: (profile: ProfileType) => void
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    getRandomFriends: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & WithRouterMatch


const  ProfileContainerAPI:React.FC<PropsType> = (props) => {


    useEffect(() => {
        refreshProfile()
    },[props.match.params.userId,props.authId])

   const refreshProfile = () => {
        let userId: number | null = Number(props.match.params.userId)
        if (!userId) {
            userId = props.authId
            if (!userId) {
                // @ts-ignore
                props.history.push('/login')
            }
        }
        if (userId) {
           props.getProfile(userId)
           props.getUserStatus(userId)

        }


    }

        return (

            <Profile {...props} userId={Number(props.match.params.userId)} users={props.users} savePhoto={props.savePhoto} isOwner={!props.match.params.userId} profilePage={props.profilePage}
                     updateStatus={props.updateUserStatus}/>
        );

}


let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profilePage: state.profilePage.profile,
    userStatus: state.profilePage.status,
    authId: state.auth.id,
    auth: state.auth.isAuth,
    users: state.usersPage.users,
    followingInProgress: state.usersPage.followingInProgress,
    friendsCount: selectFriendsCount(state),
    randomFriends: selectRandomFriends(state),
})


const ProfileContainer = compose
(
    connect(mapStateToProps, {getProfile, getUserStatus,getUsersSubs,getRandomFriends, updateUserStatus, savePhoto,follow,unFollow}),
    withRouter
)
(ProfileContainerAPI)
export default ProfileContainer