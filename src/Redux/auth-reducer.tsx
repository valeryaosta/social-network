import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {authAPI} from "../API/api";
import {StoreType} from "./redux-store";
import {FormAction} from "redux-form";

const SET_USER_DATA = 'SET-USER-DATA';

export type InitialAuthType = {
    id: number | null
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
                ...action.payload
            }
        default:
            return state
    }
}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'SET-USER-DATA',
    payload: {
        id: id,
        email: email,
        login: login,
        isAuth: isAuth
    }
} as const)

export type AuthActionsType =
    | ReturnType<typeof setAuthUserData>

type ThunkType = ThunkAction<void, StoreType, unknown, AuthActionsType>
type ThunkDispatchType = ThunkDispatch<StoreType, unknown, AuthActionsType | FormAction>

export const getAuthUserData = (): ThunkType => (dispatch: ThunkDispatchType) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        })
}

export const login = (email: string, password: string, rememberMe: boolean = false) => (dispatch: ThunkDispatchType) => {
    authAPI.login(email, password, rememberMe = false)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
        })
}

export const logout = () => (dispatch: ThunkDispatchType) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
}

export default authReducer;