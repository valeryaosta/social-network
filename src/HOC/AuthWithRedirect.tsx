import React from "react";
import { Redirect } from "react-router-dom";
import {connect} from "react-redux";
import { StoreType } from "../Redux/redux-store";
import { ComponentType } from "react";

type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: StoreType): MapStateToPropsType => {
    return {
        isAuth: state.authState.isAuth
    }
}

export function WithAuthRedirect <T>(Component: ComponentType<T>)  {

    const RedirectComponent = (props: MapStateToPropsType) => {
        let {isAuth, ...restProps} = props

        if (!isAuth) return <Redirect to={'/login'} />
        return <Component {...restProps as T}/>
    }

    let ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)

    return ConnectedRedirectComponent;

}