import React from 'react';
import {oneUserType} from "../Redux/users-reducer";
import Paginator from "../Common Components/Paginator/Paginator";
import User from "./User";

export type PropsType = {
    users: Array<oneUserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    followingInProgress: Array<number>
}
//new version functional component
let UserS: React.FC<PropsType> = ({
                                      users,
                                      follow,
                                      unfollow,
                                      totalUsersCount,
                                      pageSize,
                                      currentPage,
                                      onPageChanged,
                                      followingInProgress, ...props
                                  }) => {

    return <div>

        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                   currentPage={currentPage} onPageChanged={onPageChanged} portionSize={10}/>
        <div>
            {
                users.map(u => <User key={u.id} user={u}
                                     followingInProgress={followingInProgress}
                                     follow={follow} unfollow={unfollow}
                />)
            }
        </div>
    </div>
}

export default UserS;