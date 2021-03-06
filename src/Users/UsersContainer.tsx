import {connect} from "react-redux";
import {RootStateType} from "../Redux/store";
import Users from "./Users";
import {
    followActionCreator, oneUserType,
    setUsersActionCreator,
    unfollowActionCreator,
    UsersActionsType
} from "../Redux/users-reducer";


const mapStateToProps = (state: RootStateType) => {
    return {
        users: state.usersPage.users
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
        }
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer;