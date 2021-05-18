import {StoreType} from "./redux-store";

export const getUsersAll = (state: StoreType) => {
    return state.usersPage.users
}
export const getPageSize = (state: StoreType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: StoreType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: StoreType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: StoreType) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: StoreType) => {
    return state.usersPage.followingInProgress
}