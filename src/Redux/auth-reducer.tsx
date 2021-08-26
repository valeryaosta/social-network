import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {authAPI, securityAPI} from "../API/api";
import {StoreType} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET-USER-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET-CAPTCHA-URL-SUCCESS';

export type InitialAuthType = {
    id: string
    email: null | string
    login: null | string
    isAuth: boolean
    captchaUrl: null | string
}

export const InitialAuthState: InitialAuthType = {
    id: "",
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state: InitialAuthType = InitialAuthState, action: AuthActionsType): InitialAuthType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

export const setAuthUserData = (email: string | null, id: string, login: string | null,
                                isAuth: boolean) => ({
    type: 'auth/SET-USER-DATA',
    payload: {
        email: email,
        id: id,
        login: login,
        isAuth: isAuth
    }
} as const)

export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: 'auth/GET-CAPTCHA-URL-SUCCESS',
    payload: {captchaUrl: captchaUrl}
} as const)


export type AuthActionsType =
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof getCaptchaUrlSuccess>

type ThunkType = ThunkAction<void, StoreType, unknown, AuthActionsType>
type ThunkDispatchType = ThunkDispatch<StoreType, unknown, AuthActionsType | FormAction>

export const getAuthUserData = (): ThunkType => async (dispatch: ThunkDispatchType) => {
    let response = await authAPI.me();

    if (response.data.resultCode === 0) {
        let {email, id, login} = response.data.data;
        dispatch(setAuthUserData(email, id, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean = false, captcha: string): ThunkType =>
    async (dispatch: ThunkDispatchType) => {

        let response = await authAPI.login(email, password, rememberMe, captcha);

        if (response.data.resultCode === 0) {
            //success, get auth data
            dispatch(getAuthUserData())
        } else {
            if (response.data.resultCode === 10) {
                //await dispatch(getCaptcha());
                dispatch(getCaptcha());
            }

            let message = response.data.messages.length > 0
                ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit('login', {_error: message}))
        }
    }

export const getCaptcha = () => async (dispatch: ThunkDispatchType) => {
    try {
        let response = await securityAPI.getCaptcha();
        let captchaUrl = response.data.url;

        dispatch(getCaptchaUrlSuccess(captchaUrl))
    } catch (error) {
        //add modal handler-catcher
    }
}

export const logout = (): ThunkType => async (dispatch: ThunkDispatchType) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, '', null, false))
    }

}

export default authReducer;
