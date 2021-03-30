import React from 'react';
import {Redirect} from "react-router-dom";



const Dialogs = (props) => {
    if (!props.isAuth) return <Redirect to={'/login'}/>
    return (
        <h1>В разработке</h1>
    )

};

export default Dialogs;

