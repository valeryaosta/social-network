import React from 'react';
import './App.css';
import Navbar from "./Navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import UsersContainer from "./Users/UsersContainer";
import ProfileContainer from "./Profile/ProfileInfo/ProfileContainer";
import HeaderContainer from "./Header/HeaderContainer";
import LoginPage from "./Login/Login";
import DialogsContainer from "./Dialogues/DialogsContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/app-reducer";
import {StoreType} from "./Redux/redux-store";
import Preloader from "./Common Components/Preloader/Preloader";

type MSTPType = {
    initialized: boolean
}

export type MDTPType = {
    initializeApp: () => void
}

export type AppPropsType = MDTPType & MSTPType

class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

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
                    //comm review
                    {/*<Route path='/news' render={() => <News/>}/>
                <Route path='/music' render={() => <Music/>}/>
                <Route path='/settings' render={() => <Settings/>}/>*/}
                </div>
            </div>

        )
    }
}

const MapStateToProps = (state: StoreType): MSTPType => ({
    initialized: state.app.initialized,
})

export default compose<React.ComponentType>(
    withRouter,
    connect(MapStateToProps, {initializeApp}))(App);
