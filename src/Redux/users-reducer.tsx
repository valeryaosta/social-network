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
    /*
    users: [
        {id: 1,
            photoUrl: 'https://www.vokrug.tv/pic/person/3/b/2/a/3b2a14a17798e77b69961fd22b5152f5.jpg',
            followed: false, fullName: "Elena D.", status: 'Waiting for you', location: {city: 'Minsk', country: 'Belarus'}},
        {id: 2,
            photoUrl: 'https://m.media-amazon.com/images/M/MV5BM2ZhZmM0M2MtZDQ4Ni00ZTAyLTkyODQtNGJkZTE2NDc0NzNkXkEyXkFqcGdeQXVyNjk1MjYyNTA@._V1_UY209_CR4,0,140,209_AL_.jpg',
            followed: true, fullName: "Victor R.", status: 'What is new?', location: {city: 'Toronto', country: 'Canada'}},
        {id: 3,
            photoUrl: 'http://images4.fanpop.com/image/photos/17100000/ian-somerhalder-damon-salvatore-17181930-388-480.jpg',
            followed: true, fullName: "John G.", status: 'Looking for something', location: {city: 'Tokyo', country: 'Japan'}},
        {id: 4,
            photoUrl: 'https://list.lisimg.com/image/16219914/450full.jpg',
            followed: false, fullName: "Kate H.", status: 'Next time..', location: {city: 'Barcelona', country: 'Spain'}},
    ],*/
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
    | ReturnType<typeof followActionCreator>
    | ReturnType<typeof unfollowActionCreator>
    | ReturnType<typeof setUsersActionCreator>
    | ReturnType<typeof setCurrentPageActionCreator>
    | ReturnType<typeof setTotalUsersCountActionCreator>
    | ReturnType<typeof toggleIsFetchingActionCreator>

export const followActionCreator = (userId: number) => ({
    type: 'FOLLOW',
    userId: userId
} as const)

export const unfollowActionCreator = (userId: number) => ({
    type: 'UNFOLLOW',
    userId: userId
} as const)

export const setUsersActionCreator = (users: Array<oneUserType>) => ({
    type: 'SET-USERS',
    users: users
} as const)

export const setCurrentPageActionCreator = (currentPage: number) => ({
    type: 'SET-CURRENT-PAGE',
    currentPage: currentPage
} as const)

export const setTotalUsersCountActionCreator = (totalCount: number) => ({
    type: 'SET-TOTAL-USERS-COUNT',
    totalCount: totalCount
} as const)

export const toggleIsFetchingActionCreator = (isFetching: boolean) => ({
    type: 'TOGGLE-IS-FETCHING',
    isFetching: isFetching
} as const)

export default usersReducer;
