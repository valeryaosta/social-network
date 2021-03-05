import React from 'react';
import './App.css';
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import Profile from "./Profile/Profile";
import Dialogs from "./Dialogues/Dialogs";
import {ActionTypes, RootStateType} from "./Redux/store";
import {Route} from "react-router-dom"
import {ReduxStoreType} from "./Redux/redux-store";
import DialogsContainer from "./Dialogues/DialogsContainer";

type PropsType = {
   // store: ReduxStoreType
}

const App = (props: PropsType) => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Route path='/dialogs'
                       render={() => < DialogsContainer
                       />}/>
                <Route path='/profile'
                       render={() => <Profile /*store={props.store}*/
                       />}/>


                {/*  <Route path='/news' render = { () => <News /> }/>
                    <Route path='/music' render = { () => <Music />}/>
                    <Route path='/settings' render ={ () => <Settings />}/>*/}
            </div>
        </div>

    );
}

export default App;
