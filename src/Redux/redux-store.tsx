import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import thunkMiddleware from "redux-thunk"
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    authState: authReducer
});

let store = createStore(rootReducer, (applyMiddleware(thunkMiddleware)));

export default store;

type RootReducerType = typeof rootReducer; //(store: StoreType) => StoreType
export type StoreType = ReturnType<RootReducerType>

