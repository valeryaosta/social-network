import {profileAPI, usersAPI} from "../API/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {StoreType} from "./redux-store";


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

/*type PhotosType = {
    small: string
    large: string
}*/

export type ProfileType = {
    userId: string | null
    lookingForAJob: string
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: { small: string, large: string }
}

export type InitialProfileType = {
    posts: Array<PostType>
    profile: ProfileType | null
    status: string | null
    newPostText: string
}

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE';
const SET_STATUS = 'profile/SET-STATUS';
const DELETE_POST = 'profile/DELETE-POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE-PHOTO-SUCCESS';

export const initialProfileState: InitialProfileType = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 17},
        {id: 2, message: "It's my first post!", likesCount: 28},
        {id: 3, message: "Finally here I am!", likesCount: 11},
        {id: 4, message: "Yo Yo man", likesCount: 3}
    ],
    profile: null as ProfileType | null,
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
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
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
    | ReturnType<typeof deletePost>
    | ReturnType<typeof savePhotoSuccess>


type ThunkType = ThunkAction<void, StoreType, unknown, ProfileActionsType>
type ThunkDispatchType = ThunkDispatch<StoreType, unknown, ProfileActionsType>


export const addPostActionCreator = (newPostText: string) => ({
    type: 'profile/ADD-POST',
    newPostText: newPostText
} as const)

export const setUserProfile = (profile: ProfileType | null) => ({
    type: 'profile/SET-USER-PROFILE',
    profile: profile
} as const)

export const setStatus = (status: string | null) => ({
    type: 'profile/SET-STATUS',
    status: status
} as const)

export const deletePost = (postId: number) => ({
    type: 'profile/DELETE-POST',
    postId: postId
} as const)
export const savePhotoSuccess = (photos: { small: string, large: string }) => ({
    type: 'profile/SAVE-PHOTO-SUCCESS',
    photos: photos

} as const)

/*export const getUserProfile = (userId: string) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId).then(response => {
            dispatch(setUserProfile(response.data));
        })
}*/

export const getUserProfile = (userId: string): ThunkType => async (dispatch: ThunkDispatchType) => {
    let response = await usersAPI.getProfile(userId);

    dispatch(setUserProfile(response.data))
}

export const getStatusProfile = (userId: string): ThunkType => async (dispatch: ThunkDispatchType) => {
    let response = await profileAPI.getStatus(userId);

    dispatch(setStatus(response.data))
}

export const updateStatusProfile = (status: string | null): ThunkType => async (dispatch: ThunkDispatchType) => {
    let response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file: any): ThunkType => async (dispatch: ThunkDispatchType) => {
    let response = await profileAPI.savePhoto(file);

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}


export default profileReducer;
