import {PostType} from "./state";

export type InitialProfileType = {
    posts: Array<PostType>
    newPostText: string
}

export const initialProfileState: InitialProfileType = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 17},
        {id: 2, message: "It's my first post!", likesCount: 28},
        {id: 3, message: "Finally here I am!", likesCount: 11},
        {id: 4, message: "Yo Yo Yollu Pukki", likesCount: 3}
    ],
    newPostText: '',
}
const profileReducer = (state = initialProfileState, action: ProfileActionsType): InitialProfileType => {

    if (action.type === 'ADD-POST') {
        let newPost: PostType = {
            id: new Date().getTime(),
            message: action.postText,
            likesCount: 0
        };
        state.posts.push(newPost);
        state.newPostText = '';
    } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
        state.newPostText = action.newText;
    }
    return state;
}

export type ProfileActionsType =
    | ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof UpdateNewPostTextActionCreator>

export const addPostActionCreator = (postText: string) => ({
    type: 'ADD-POST',
    postText: postText
} as const)

export const UpdateNewPostTextActionCreator = (newText: string) => ({
    type: 'UPDATE-NEW-POST-TEXT',
    newText: newText
} as const)

export default profileReducer;
