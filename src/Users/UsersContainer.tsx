import {connect} from "react-redux";
import {
    follow, getUsers,
    oneUserType,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleFollowingProgress, toggleIsFetching, unfollow
} from "../Redux/users-reducer";
import React, {ComponentType} from "react";
import UserS from "./UserSS";
import Preloader from "../Common Components/Preloader/Preloader";
import {StoreType} from "../Redux/redux-store";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsersSSelector
} from "../Redux/users-selectors";

export type UsersPropsType = {
    users: Array<oneUserType>
    follow: (userId: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<oneUserType>) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    isFetching: boolean
    toggleIsFetching: (isFetching: boolean) => void
    followingInProgress: Array<number>
    getUsers: (currentPage: number, pageSize: number) => void
}

class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize)
    }

    render() {
        return <div style={{marginLeft: 12}}>
            {this.props.isFetching ? <Preloader/> : null}
            <UserS totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </div>
    }
}

const mapStateToProps = (state: StoreType) => {
    return {
        users: getUsersSSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {
        follow, unfollow, setUsers,
        setCurrentPage, setTotalUsersCount, toggleIsFetching,
        toggleFollowingProgress, getUsers
    }))(UsersContainer);