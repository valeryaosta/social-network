import React from 'react';
import './App.css';
import Navbar from "./Navbar/Navbar";
import {Route} from "react-router-dom";
import UsersContainer from "./Users/UsersContainer";
import ProfileContainer from "./Profile/ProfileInfo/ProfileContainer";
import HeaderContainer from "./Header/HeaderContainer";
import LoginPage from "./Login/Login";
import DialogsContainer from "./Dialogues/DialogsContainer";


const App = () => {
    return (
        <div className="app-wrapper">
            <HeaderContainer/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Route path='/dialogs'
                       render={() => <DialogsContainer
                       />}/>
                <Route path='/profile/:userId?'
                       render={() => <ProfileContainer
                       />}/>
                <Route path='/users'
                       render={() => <UsersContainer/>}/>

                <Route path='/login'
                       render={() => <LoginPage/>}/>

                {/*<Route path='/news' render={() => <News/>}/>
                <Route path='/music' render={() => <Music/>}/>
                <Route path='/settings' render={() => <Settings/>}/>*/}
            </div>
        </div>

    );
}

export default App;
