import {PostType} from "./store";

export type InitialProfileType = {
    posts: Array<PostType>
    newPostText: string
}

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

export const initialProfileState: InitialProfileType = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 17},
        {id: 2, message: "It's my first post!", likesCount: 28},
        {id: 3, message: "Finally here I am!", likesCount: 11},
        {id: 4, message: "Yo Yo man", likesCount: 3}
    ],
    newPostText: '',
}

const profileReducer = (state = initialProfileState, action: ProfileActionsType): InitialProfileType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost: PostType = {
                id: new Date().getTime(),
                message: state.newPostText,
                likesCount: 0
            };
            let stateCopy = {...state}
            stateCopy.posts = [...state.posts]
            stateCopy.posts.push(newPost)
            stateCopy.newPostText = '';
            return stateCopy
        }
        case UPDATE_NEW_POST_TEXT: {
            let stateCopy  = {...state}
            stateCopy.newPostText = action.newText;
            return stateCopy ;
        }
        default:
            return state;
    }
}


export type ProfileActionsType =
    | ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof UpdateNewPostTextActionCreator>

export const addPostActionCreator = () => ({
    type: 'ADD-POST'
} as const)

export const UpdateNewPostTextActionCreator = (newText: string) => ({
    type: 'UPDATE-NEW-POST-TEXT',
    newText: newText
} as const)

export default profileReducer;
