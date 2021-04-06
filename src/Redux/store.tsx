import {initialProfileState, ProfileActionsType} from "./profile-reducer";
import  {DialogsActionsTypes, InitialDialogState,} from "./dialogs-reducer";
import  {InitialSidebarState} from "./sidebar-reducer";
import {initialUsersState, InitialUsersType} from "./users-reducer";
import {InitialAuthState, InitialAuthType} from "./auth-reducer";

export type MessageType = {
    id: number,
    message: string
}
export type DialogsType = {
    id: number,
    name: string
}
export type PostType = {
    id: number,
    message: string,
    likesCount: number
}

type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
type PhotosType = {
    small: string
    large: string
}
export type ProfileType = {
    userId: string
    lookingForAJob: string
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
    profile: null | ProfileType
}

export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessageType>
    newMessageBody: string
}
export type SidebarType = {}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
    usersPage: InitialUsersType
    authPage: InitialAuthType
}

export type StoreType = {
    _state: RootStateType
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    //dispatch: (action: ActionTypes) => void
}

export type ActionTypes = ProfileActionsType & DialogsActionsTypes

const store: StoreType = {
    _state: {
        profilePage: initialProfileState,
        dialogsPage: InitialDialogState,
        sidebar: InitialSidebarState,
        usersPage: initialUsersState,
        authPage: InitialAuthState
    },
    _callSubscriber() {
        console.log("State changed")
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    //dispatch(action: ActionTypes) {
        //this._state.profilePage = profileReducer(this._state.profilePage, action);
        //this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        //this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        //this._state.usersPage = usersReducer(this._state.usersPage, action);
        //this._state.authPage = authReducer(this._state.authPage, action);
        //this._callSubscriber();}

}

export default store;
