type MessageType = {
    id: number,
    message: string
}
type DialoguesType = {
    id: number,
    name: string
}
export type PostType = {
    id: number,
    message: string,
    likesCount: number
}
type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}
type DialoguePageType = {
    dialogues: Array<DialoguesType>
    messages: Array<MessageType>
}
type SidebarType = {}

export type RootStateType = {
    profilePage: ProfilePageType
    dialoguesPage: DialoguePageType
    sidebar: SidebarType
}

export type StoreType = {
    _state: RootStateType
    updateNewPostText: (newText: string) => void
    addPost: (postText: string) => void
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: AddPostActionType | UpdateNewPostText) => void
}

type AddPostActionType = {
    type: 'ADD-POST'
    postText: string
}
type UpdateNewPostText = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}
export type ActionTypes = AddPostActionType | UpdateNewPostText

const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hi, how are you?", likesCount: 17},
                {id: 2, message: "It's my first post!", likesCount: 28},
                {id: 3, message: "Finally here I am!", likesCount: 11},
                {id: 4, message: "Yo Yo Yollu Pukki", likesCount: 3}
            ],
            newPostText: '',
        },
        dialoguesPage: {
            dialogues: [
                {id: 1, name: "Valery"},
                {id: 2, name: "Eugene"},
                {id: 3, name: "Kseniya"},
                {id: 4, name: "Vitaliy"},
                {id: 5, name: "Oksana"},
                {id: 6, name: "Ellina"}
            ],
            messages: [
                {id: 1, message: "Hey, cutiee"},
                {id: 2, message: "What's uuup?!"},
                {id: 3, message: "Yo bro!"},
                {id: 4, message: "God damn!!"},
                {id: 5, message: "That's nicee.."},
                {id: 6, message: "Got it."}
            ],
        },
        sidebar: {}
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
    updateNewPostText(newText: string) {
        this._state.profilePage.newPostText = newText
        this._callSubscriber();
    },
    addPost(postText: string) {
        let newPost: PostType = {
            id: new Date().getTime(),
            message: this._state.profilePage.newPostText,
            likesCount: 0
        };
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = '';
        this._callSubscriber();
    },
    dispatch(action: AddPostActionType | UpdateNewPostText) {
        if (action.type === 'ADD-POST') {
            let newPost: PostType = {
                id: new Date().getTime(),
                message: action.postText,
                likesCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber();
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber();
        }
    }
}

export default store;
