import {rerenderEntireTree} from "../Render";

type MessageType = {
    id: number,
    message: string
}
type dialoguesType = {
    id: number,
    name: string
}
type postType = {
    id: number,
    message: string,
    likesCount: number
}
type profilePageType = {
    posts: Array<postType>
    newPostText: string
}
type dialoguePageType = {
    dialogues: Array<dialoguesType>
    messages: Array<MessageType>
}
type sidebarType = {}

export type RootStateType = {
    profilePage: profilePageType
    dialoguesPage: dialoguePageType
    sidebar: sidebarType
}
let state: RootStateType = {
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
}

export let addPost = () => {
    let newPost: postType = {
        id: new Date().getTime(),
        message: state.profilePage.newPostText,
        likesCount: 0
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree(state);
}

export let updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText
    rerenderEntireTree(state)
}

export default state;