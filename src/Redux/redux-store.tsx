import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialoguesReducer from "./dialogues-reducer";
import sidebarReducer from "./sidebar-reducer";
import thunkMiddleware from "redux-thunk"
import {ActionTypes, RootStateType} from "./store";

export type ReduxStoreType = {
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionTypes) => void
}

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialoguesPage: dialoguesReducer,
    sidebar: sidebarReducer
});

let store = createStore(rootReducer, (applyMiddleware(thunkMiddleware)));

export default store;

type RootReducerType = typeof rootReducer; //(store: StoreType) => StoreType
export type StoreType = ReturnType<RootReducerType>

