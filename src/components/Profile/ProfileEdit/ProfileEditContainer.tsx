import React from 'react';
import { connect } from 'react-redux';
import {AppStateType} from "../../../redux/redux-store";
import {selectIsSaveProfile, selectProfile} from "../../../redux/Profile/profile-select";
import {ProfileType} from "../../../Types/Types";
import {saveProfile} from "../../../redux/Profile/profile-actions";
import ProfileEdit from "./ProfileEdit";


type MapStatePropsType = {
    profile: ProfileType | null
    isSaveProfile: boolean
}

type MapDispatchPropsType = {
    saveProfile: (values: object) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType



const ProfileEditContainer: React.FC<PropsType> = ({profile,saveProfile,isSaveProfile})=> {

    return (
        <ProfileEdit profilePage={profile} saveProfile={saveProfile} isSaveProfile={isSaveProfile}/>
    );
};

const MapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: selectProfile(state),
        isSaveProfile: selectIsSaveProfile(state)
    }
}

 export default connect<MapStatePropsType,MapDispatchPropsType,{},AppStateType>(MapStateToProps,{saveProfile})(ProfileEditContainer);

