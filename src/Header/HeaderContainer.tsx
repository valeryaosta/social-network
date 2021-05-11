import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {StoreType} from "../Redux/redux-store";
import {getAuthUserData, logout} from "../Redux/auth-reducer";


type MSTPType = {
    isAuth: boolean
    login: string | null
}
export type MDTPType = {
    getAuthUserData: () => void
    logout: () => void
}

export type HeaderContainerPropsType = MSTPType & MDTPType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
        this.props.getAuthUserData();
    }

    render() {
        return <Header {...this.props} />
    }
}

const MapStateToProps = (state: StoreType): MSTPType => ({
    isAuth: state.authState.isAuth,
    login: state.authState.login
})


export default connect(MapStateToProps, {getAuthUserData, logout})(HeaderContainer);