import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../API/api";

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

export type InitialProfileType = {
    posts: Array<PostType>
    profile: ProfileType | null
    status: string | null
    newPostText: string
}

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';

export const initialProfileState: InitialProfileType = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 17},
        {id: 2, message: "It's my first post!", likesCount: 28},
        {id: 3, message: "Finally here I am!", likesCount: 11},
        {id: 4, message: "Yo Yo man", likesCount: 3}
    ],
    profile: null,
    status: '',
    newPostText: ''
}

const profileReducer = (state = initialProfileState, action: ProfileActionsType): InitialProfileType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost: PostType = {
                id: new Date().getTime(),
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}


export type ProfileActionsType =
    | ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>

export const addPostActionCreator = (newPostText: string) => ({
    type: 'ADD-POST',
    newPostText: newPostText
} as const)

export const setUserProfile = (profile: ProfileType | null) => ({
    type: 'SET-USER-PROFILE',
    profile: profile
} as const)

export const setStatus = (status: string | null) => ({
    type: 'SET-STATUS',
    status: status
} as const)

export const getUserProfile = (userId: string) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId).then(response => {
            dispatch(setUserProfile(response.data));
        })
}

export const getStatusProfile = (userId: string) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data));
    })
}

export const updateStatusProfile = (status: string | null) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status).then(response => {
        if(response.data.resultCode === 0) {
        dispatch(setStatus(status))
        }
    })
}

export default profileReducer;
