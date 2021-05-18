import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {StoreType} from "../Redux/redux-store";
import {logout} from "../Redux/auth-reducer";


type MSTPType = {
    isAuth: boolean
    login: string | null
}
export type MDTPType = {
    logout: () => void
}

export type HeaderContainerPropsType = MSTPType & MDTPType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    render() {
        return <Header {...this.props} />
    }
}

const MapStateToProps = (state: StoreType): MSTPType => ({
    isAuth: state.authState.isAuth,
    login: state.authState.login
})


export default connect(MapStateToProps, {logout})(HeaderContainer);