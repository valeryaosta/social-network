import React from 'react';
import './App.css';
import Navbar from "./Navbar/Navbar";
import {Route, withRouter, Switch, Redirect} from "react-router-dom";
import UsersContainer from "./Users/UsersContainer";
import HeaderContainer from "./Header/HeaderContainer";
import LoginPage from "./Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/app-reducer";
import {StoreType} from "./Redux/redux-store";
import Preloader from "./Common Components/Preloader/Preloader";
import WithSuspense from "./HOC/WithSuspense";
import Music from "./Music/Music";
import News from "./News/News";
import Settings from "./Settings/Settings";


const DialogsContainer = React.lazy(() => import("./Dialogues/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./Profile/ProfileInfo/ProfileContainer"));

type MSTPType = {
    initialized: boolean
}

export type MDTPType = {
    initializeApp: () => void
}

export type AppPropsType = MDTPType & MSTPType

class App extends React.Component<AppPropsType> {

    catchAllUnhandledErrors = () => {
        alert('Sorry, some error occurred!')
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
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
                    <Switch>
                        <Route exact path={'/'} render={() => <Redirect to={'/profile'}/>}/>
                        <Route path={'/dialogs'}
                               render={() => WithSuspense(DialogsContainer)}/>
                        <Route path={'/profile/:userId?'}
                               render={() => WithSuspense(ProfileContainer)}/>
                        <Route path={'/users'}
                               render={() => <UsersContainer/>}/>
                        <Route path={'/login'}
                               render={() => <LoginPage/>}/>
                        <Route path={'/music'} render={() => <Music/>}/>
                        <Route path={'/news'} render={() => <News/>}/>
                        <Route path={'/settings'} render={() => <Settings/>}/>
                        <Route path={'*'} render={() => <h1>404 NOT FOUND</h1>}/>
                    </Switch>
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
