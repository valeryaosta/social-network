export type locationUsersType = {
    city: string
    country: string
}

export type oneUserType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: locationUsersType
}

export type InitialUsersType = {
    users: Array<oneUserType>
}

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

export const initialUsersState: InitialUsersType = {
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
    ],
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
                users: [...state.users, ...action.users]
            }
        default:
            return state;
    }
}

export type UsersActionsType =
    | ReturnType<typeof followActionCreator>
    | ReturnType<typeof unfollowActionCreator>
    | ReturnType<typeof setUsersActionCreator>

export const followActionCreator = (userId: number) => ({
    type: 'FOLLOW',
    userId: userId
} as const)

export const unfollowActionCreator = (userId: number) => ({
    type: 'UNFOLLOW',
    userId: userId
} as const)

export const setUsersActionCreator = (users: any) => ({
    type: 'SET-USERS',
    users: users
} as const)

export default usersReducer;
