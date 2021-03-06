import React from 'react';
import './App.css';
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import Profile from "./Profile/Profile";
import {Route} from "react-router-dom";
import DialogsContainer from "./Dialogues/DialogsContainer";
import UsersContainer from "./Users/UsersContainer";


const App = () => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Route path='/dialogs'
                       render={() => < DialogsContainer
                       />}/>
                <Route path='/profile'
                       render={() => <Profile
                       />}/>
                <Route path='/users'
                       render={() => <UsersContainer /> }/>

                {/*  <Route path='/news' render = { () => <News /> }/>
                    <Route path='/music' render = { () => <Music />}/>
                    <Route path='/settings' render ={ () => <Settings />}/>*/}
            </div>
        </div>

    );
}

export default App;
