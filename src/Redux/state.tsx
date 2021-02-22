import profileReducer, {
    addPostActionCreator, initialProfileState,
    ProfileActionsType,
    UpdateNewPostTextActionCreator
} from "./profile-reducer";
import dialoguesReducer, {
    DialogsActionsTypes, InitialDialogState,
    SendMessageCreator,
    UpdateNewMessageBodyCreator
} from "./dialogues-reducer";
import sidebarReducer from "./sidebar-reducer";

export type MessageType = {
    id: number,
    message: string
}
export type DialoguesType = {
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
export type DialoguePageType = {
    dialogues: Array<DialoguesType>
    messages: Array<MessageType>
    newMessageBody: string
}
export type SidebarType = {}

export type RootStateType = {
    profilePage: ProfilePageType
    dialoguesPage: DialoguePageType
    sidebar: SidebarType
}

export type StoreType = {
    _state: RootStateType
    // updateNewPostText: (newText: string) => void
    // addPost: (postText: string) => void
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionTypes) => void
}


export type ActionTypes = ProfileActionsType & DialogsActionsTypes

const store: StoreType = {
    _state: {
        profilePage: initialProfileState,
        dialoguesPage: InitialDialogState,
        sidebar: sidebarReducer
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
        this._state.dialoguesPage = dialoguesReducer(this._state.dialoguesPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber();
    }
}

export default store;
