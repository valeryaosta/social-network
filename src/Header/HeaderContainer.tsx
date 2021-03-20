import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../Redux/auth-reducer";
import {StoreType} from "../Redux/redux-store";


type MSTPType = {
    isAuth: boolean
    login: string | null
}
export type MDTPType = {
    setAuthUserData: (id: number, email: string, login: string) => void
}

export type HeaderContainerPropsType = MSTPType & MDTPType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
            axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
                withCredentials: true
            })
                .then(response => {
                   if(response.data.resultCode === 0){
                       let {id, email, login} = response.data.data;
                       this.props.setAuthUserData(id, email, login)
                   }
                })
        }
    render() {
        return <Header {...this.props} />
    }
}
const MapStateToProps = (state: StoreType) : MSTPType => ({
    isAuth: state.authState.isAuth,
    login: state.authState.login
})


export default connect(MapStateToProps,{setAuthUserData}) (HeaderContainer);