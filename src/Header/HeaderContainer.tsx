import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {StoreType} from "../Redux/redux-store";
import {getAuthUserData, setAuthUserData} from "../Redux/auth-reducer";


type MSTPType = {
    isAuth: boolean
    login: string | null
}
export type MDTPType = {
    //setAuthUserData: (id: number, email: string, login: string) => void
    getAuthUserData: () => void
}

export type HeaderContainerPropsType = MSTPType & MDTPType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
        this.props.getAuthUserData();
        /* authAPI.me()
              .then(response => {
                  if(response.data.resultCode === 0){
                      let {id, email, login} = response.data.data;
                      this.props.setAuthUserData(id, email, login)
                  }
              })*/
    }

    render() {
        return <Header {...this.props} />
    }
}

const MapStateToProps = (state: StoreType): MSTPType => ({
    isAuth: state.authState.isAuth,
    login: state.authState.login
})


export default connect(MapStateToProps, {getAuthUserData})(HeaderContainer);