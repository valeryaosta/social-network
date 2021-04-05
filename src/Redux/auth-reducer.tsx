import {Dispatch} from "redux";
import {authAPI} from "../API/api";

const SET_USER_DATA = 'SET-USER-DATA';

export type InitialAuthType = {
    id: null | number
    email: null | string
    login: null | string
    isAuth: boolean
}

export const InitialAuthState: InitialAuthType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state: InitialAuthType = InitialAuthState, action: AuthActionsType): InitialAuthType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
            ...state,
            id: action.id,
            email: action.email,
            login: action.login,
            isAuth: true
            }
        default:
            return state
    }
}


export const setAuthUserData = ( id: number , email: string , login: string )  => ({
    type: 'SET-USER-DATA',
    id: id,
    email: email,
    login: login
} as const)

export type AuthActionsType =
    | ReturnType<typeof setAuthUserData>

export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me().then(response => {
            if(response.data.resultCode === 0){
                let {id, email, login} = response.data.data;
                dispatch(setAuthUserData(id, email, login));
            }
        })
}

export default authReducer;