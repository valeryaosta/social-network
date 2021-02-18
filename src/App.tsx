import React from 'react';
import './App.css';
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import Profile from "./Profile/Profile";
import Dialogues from "./Dialogues/Dialogues";
import {ActionTypes, RootStateType} from "./Redux/state";
import {Route} from "react-router-dom"

type PropsType = {
    state: RootStateType
    dispatch: (action: ActionTypes) => void
}

const App = (props: PropsType) => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Route path='/dialogues'
                       render={() => <Dialogues state={props.state}/>}/>
                <Route path='/profile'
                       render={() => <Profile
                           state={props.state}
                           dispatch={props.dispatch}
                       />}/>


                {/*  <Route path='/news' render = { () => <News /> }/>
                    <Route path='/music' render = { () => <Music />}/>
                    <Route path='/settings' render ={ () => <Settings />}/>*/}
            </div>
        </div>

    );
}

export default App;
