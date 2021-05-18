import usersAPI from "../API/api";
import {StoreType} from "./redux-store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

export type locationUsersType = {
    city: string
    country: string
}
export type photosUsersType = {
    small: null | string
    large: null | string
}

export type oneUserType = {
    id: number
    photoUrl: string
    followed: boolean
    name: string
    status: string | null
    location: locationUsersType
    photos: photosUsersType
    //uniqueUrlName: string | null
}

export type InitialUsersType = {
    users: Array<oneUserType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>
}

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';

export const initialUsersState: InitialUsersType = {
    users: [],
    pageSize: 25,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state = initialUsersState, action: UsersActionsType): InitialUsersType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case "SET-USERS":
            return {
                ...state,
                users: action.users
            }
        case "SET-CURRENT-PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            }
        case "SET-TOTAL-USERS-COUNT":
            return {
                ...state, totalUsersCount: action.totalCount
            }
        case "TOGGLE-IS-FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "TOGGLE-IS-FOLLOWING-PROGRESS":
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

export type UsersActionsType =
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>

type ThunkType = ThunkAction<void, StoreType, unknown, UsersActionsType>
type ThunkDispatchType = ThunkDispatch<StoreType, unknown, UsersActionsType>


export const followSuccess = (userId: number) => ({
    type: 'FOLLOW',
    userId: userId
} as const)

export const unfollowSuccess = (userId: number) => ({
    type: 'UNFOLLOW',
    userId: userId
} as const)

export const setUsers = (users: Array<oneUserType>) => ({
    type: 'SET-USERS',
    users: users
} as const)

export const setCurrentPage = (currentPage: number) => ({
    type: 'SET-CURRENT-PAGE',
    currentPage: currentPage
} as const)

export const setTotalUsersCount = (totalCount: number) => ({
    type: 'SET-TOTAL-USERS-COUNT',
    totalCount: totalCount
} as const)

export const toggleIsFetching = (isFetching: boolean) => ({
    type: 'TOGGLE-IS-FETCHING',
    isFetching: isFetching
} as const)

export const toggleFollowingProgress = (followingInProgress: boolean, userId: number) => ({
    type: 'TOGGLE-IS-FOLLOWING-PROGRESS',
    followingInProgress: followingInProgress,
    userId: userId
} as const)

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {

    return (dispatch: ThunkDispatchType) => {
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(setCurrentPage(currentPage))
                dispatch(toggleIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount));
            })
            .finally(() => {
                dispatch(toggleIsFetching(false))
            })
    }
}


export const follow = (userId: number): ThunkType => {

    return (dispatch: ThunkDispatchType) => {
        dispatch(toggleFollowingProgress(true, userId));
        usersAPI.followUser(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(followSuccess(userId));
                }
                dispatch(toggleFollowingProgress(false, userId))
            })
    }
}


export const unfollow = (userId: number): ThunkType => {

    return (dispatch: ThunkDispatchType) => {
        dispatch(toggleFollowingProgress(true, userId));
        usersAPI.unfollowUser(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId));
                }
                dispatch(toggleFollowingProgress(false, userId))
            })
    }
}


export default usersReducer;
