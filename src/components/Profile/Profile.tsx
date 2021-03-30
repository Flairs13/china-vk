import React from 'react'
import MyProfile from './MyProfile/MyProfile'
import {ProfileType, UserType} from "../../Types/Types";


type PropsType = {
    isOwner: boolean
    userId: number | null
    profilePage: ProfileType | null
    userStatus: string
    updateStatus: (status: string) => void
    savePhoto: (obj: object) => void
    users: Array<UserType>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    followingInProgress: Array<number>
    getUsersSubs: (userId: number | null) => void
    friendsCount: number
    getRandomFriends: () => void
    randomFriends: Array<UserType>
    auth: boolean
}

const Profile: React.FC<PropsType> = (props) => {
    return (
        <main>
            <MyProfile {...props} users={props.users} savePhoto={props.savePhoto} isOwner={props.isOwner} profilePage={props.profilePage} userStatus={props.userStatus} updateStatus={props.updateStatus}/>
        </main>
    );
}

export default Profile