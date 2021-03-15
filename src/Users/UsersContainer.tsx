import {connect} from "react-redux";
import {RootStateType} from "../Redux/store";
import Users from "./Users";
import {
    followActionCreator, oneUserType, setCurrentPageActionCreator, setTotalUsersCountActionCreator,
    setUsersActionCreator,
    unfollowActionCreator,
    UsersActionsType
} from "../Redux/users-reducer";
import UsersC from "./UsersC";

const mapStateToProps = (state: RootStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}
const mapDispatchToProps = (dispatch: (action: UsersActionsType) => void) => {
    return {
        follow: (userId: number) => {
            dispatch(followActionCreator(userId))
        },
        unfollow: (userID: number) => {
            dispatch(unfollowActionCreator(userID))
        },
        setUsers: (users: Array<oneUserType>) => {
            dispatch(setUsersActionCreator(users))
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPageActionCreator(pageNumber))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setTotalUsersCountActionCreator(totalCount))
        }
    }
}
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersC)
export default UsersContainer;