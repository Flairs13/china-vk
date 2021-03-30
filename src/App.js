import React, {Suspense} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from "./components/Login/Login2";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import {initialize} from "./redux/app-reducer"
import Preloader from "./components/Preloader/Preloader";
import HeaderContainer from "./components/Header/HeaderContainer"

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const GalleryContainer = React.lazy(() => import("./components/Gallery/galleryContainer"));
const GalleryHistory = React.lazy(() => import("./components/Gallery/GalleryHistory/GalleryHistory"));
const ProfileEditContainer = React.lazy(() => import("./components/Profile/ProfileEdit/ProfileEditContainer"));


class App extends React.Component {

    componentDidMount() {
        this.props.initialize()
    }

    render() {
        if (!this.props.initialized) {
            if(!this.props.isAuth) return <Redirect to={'/login'}/>
            return <Preloader/>
        }



        return (
            <>

                <HeaderContainer/>
                <div className="app-wrapper">
                    <Navbar navbarState={this.props.state}/>
                    <div className="app-wrapper-content">
                        <Suspense fallback={<div>Загрузка...</div>}>
                            <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                            <Route path='/edit' render={() => <ProfileEditContainer/>}/>
                            <Route path='/users' render={() => <UsersContainer/>}/>
                            <Route path='/login' render={() => <Login/>}/>
                            <Route path='/news' render={() => <GalleryContainer/>}/>
                            <Route path='/history' render={() => <GalleryHistory/>}/>
                        </Suspense>
                    </div>
                </div>

            </>

        );
    }
}

let mapStateToProps = (state) => (
    {
        initialized: state.appPage.initialized,
        isAuth: state.auth.isAuth,
    }
)


export default connect(mapStateToProps, {initialize})(App);


