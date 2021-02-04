import React from 'react';
import './App.css';
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import Profile from "./Profile/Profile";
import Dialogues from "./Dialogues/Dialogues";
import {addPost, RootStateType} from "./Redux/state";
import {Route} from "react-router-dom"

type PropsType = {
    state: RootStateType
    addPost: (postText: string) => void
    updateNewPostText: (newText: string) => void
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
                           render = {() => <Profile
                           state={props.state}
                           addPost={props.addPost}
                           updateNewPostText={props.updateNewPostText}
                           />} />


                  {/*  <Route path='/news' render = { () => <News /> }/>
                    <Route path='/music' render = { () => <Music />}/>
                    <Route path='/settings' render ={ () => <Settings />}/>*/}
                </div>
            </div>

    );
}

export default App;
