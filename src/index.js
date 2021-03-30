import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ReactDOM from "react-dom";
import store from "./redux/redux-store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";


ReactDOM.render (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <App state={store.getState()}/>
        </Provider>,
    </BrowserRouter>,
    document.getElementById ('root')
);

serviceWorker.unregister ();
