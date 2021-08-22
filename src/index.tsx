import React from 'react';
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import App from "./App";
import store from "./Redux/redux-store";
import {Provider} from "react-redux";

const rerenderEntireTree = () => {
    ReactDOM.render(
        <React.StrictMode>
            <HashRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </HashRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
rerenderEntireTree();


