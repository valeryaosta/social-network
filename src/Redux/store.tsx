import profileReducer, {
    addPostActionCreator, initialProfileState,
    ProfileActionsType,
    UpdateNewPostTextActionCreator
} from "./profile-reducer";
import dialogsReducer, {
    DialogsActionsTypes, InitialDialogState,
    SendMessageCreator,
    UpdateNewMessageBodyCreator
} from "./dialogs-reducer";
import sidebarReducer, {InitialSidebarState} from "./sidebar-reducer";

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
export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}
export type DialogsPageType = {
    dialogues: Array<DialogsType>
    messages: Array<MessageType>
    newMessageBody: string
}
export type SidebarType = {}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}

export type StoreType = {
    _state: RootStateType
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionTypes) => void
}

export type ActionTypes = ProfileActionsType & DialogsActionsTypes

const store: StoreType = {
    _state: {
        profilePage: initialProfileState,
        dialogsPage: InitialDialogState,
        sidebar: InitialSidebarState
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
    dispatch(action: ActionTypes) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber();
    }
}

export default store;
