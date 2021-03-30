import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {loginOut} from "../../redux/Auth/auth-actions";


type MapStatePropsType = {
    auth: {
        id: number | null,
        login: string | null,
        isAuth: boolean
    }
    profilePhotos: string | null



}

type MapDispatchPropsType = {
    loginOut: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const HeaderContainerAPI: React.FC<PropsType> = (props) => {


    return (
        <Header loginOut={props.loginOut} photoSmall={props.profilePhotos} login={props.auth.login} isAuth={props.auth.isAuth}/>
    );

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({auth: state.auth, profilePhotos: state.auth.photo})


const HeaderContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {loginOut})(HeaderContainerAPI)

export default HeaderContainer;