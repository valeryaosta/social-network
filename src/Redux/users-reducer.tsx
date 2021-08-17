import usersAPI from "../API/api";
import {StoreType} from "./redux-store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {updateObjectInArray} from "../Utils/Validators/object-helpers";

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

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET-USERS';
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE-IS-FOLLOWING-PROGRESS';

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
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users,
                    action.userId,
                    'id',
                    {followed: true})
                // users: state.users.map((u) => {
                //     if (u.id === action.userId) {
                //         return {...u, followed: true}
                //     }
                //     return u
                // })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users,
                    action.userId,
                    'id',
                    {followed: false})
                // users: state.users.map((u) => {
                //     if (u.id === action.userId) {
                //         return {...u, followed: false}
                //     }
                //     return u
                // })
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
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
    type: 'users/FOLLOW',
    userId: userId
} as const)

export const unfollowSuccess = (userId: number) => ({
    type: 'users/UNFOLLOW',
    userId: userId
} as const)

export const setUsers = (users: Array<oneUserType>) => ({
    type: 'users/SET-USERS',
    users: users
} as const)

export const setCurrentPage = (currentPage: number) => ({
    type: 'users/SET-CURRENT-PAGE',
    currentPage: currentPage
} as const)

export const setTotalUsersCount = (totalCount: number) => ({
    type: 'users/SET-TOTAL-USERS-COUNT',
    totalCount: totalCount
} as const)

export const toggleIsFetching = (isFetching: boolean) => ({
    type: 'users/TOGGLE-IS-FETCHING',
    isFetching: isFetching
} as const)

export const toggleFollowingProgress = (followingInProgress: boolean, userId: number) => ({
    type: 'users/TOGGLE-IS-FOLLOWING-PROGRESS',
    followingInProgress: followingInProgress,
    userId: userId
} as const)

/*export const getUsers = (currentPage: number, pageSize: number): ThunkType => {

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
}*/

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {

    return async (dispatch: ThunkDispatchType) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage));

        let data = await usersAPI.getUsers(currentPage, pageSize);

        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch: ThunkDispatchType, userId: number, apiMethod: any, actionCreator: any) => {

    dispatch(toggleFollowingProgress(true, userId));

    let response = await apiMethod(userId);

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

/*export const follow = (userId: number): ThunkType => {

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
}*/

export const follow = (userId: number): ThunkType => {

    return async (dispatch: ThunkDispatchType) => {
        //let apiMethod = usersAPI.followUser.bind(usersAPI);
        //let actionCreator = followSuccess;
        //followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
      await followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), followSuccess);
    }
}

/*export const unfollow = (userId: number): ThunkType => {

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
}*/

export const unfollow = (userId: number): ThunkType => {

    return async (dispatch: ThunkDispatchType) => {
        //let apiMethod = usersAPI.unfollowUser.bind(usersAPI);
        //let actionCreator = unfollowSuccess;
        //followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
       await followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), unfollowSuccess);
    }
}
export default usersReducer;