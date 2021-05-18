import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {getAuthUserData} from "./auth-reducer";
import {StoreType} from "./redux-store";

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS';

export type InitialAppType = {
    initialized: boolean
}

export const InitialAppState: InitialAppType = {
    initialized: false
}
export const appReducer = (state: InitialAppType = InitialAppState, action: AppActionsType): InitialAppType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}
export type AppActionsType =
    | ReturnType<typeof initializedSuccess>

type ThunkType = ThunkAction<void, StoreType, unknown, AppActionsType>
type ThunkDispatchType = ThunkDispatch<StoreType, unknown, AppActionsType>

export const initializedSuccess = () => ({
    type: 'INITIALIZED-SUCCESS'
} as const)

export const initializeApp = (): ThunkType => (dispatch: ThunkDispatchType) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        })
}