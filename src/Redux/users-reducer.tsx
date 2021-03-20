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
    isFetching: boolean
}

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';

export const initialUsersState: InitialUsersType = {
    users: [],
    pageSize: 25,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: true
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
        default:
            return state;
    }
}

export type UsersActionsType =
    | ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>

export const follow = (userId: number) => ({
    type: 'FOLLOW',
    userId: userId
} as const)

export const unfollow = (userId: number) => ({
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

export default usersReducer;
