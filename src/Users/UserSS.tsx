import React from 'react';
import styles from "./Users.module.css";
import people from "../Assets/Images/people.png";
import {oneUserType} from "../Redux/users-reducer";
import {NavLink} from 'react-router-dom';
import usersAPI from "../API/api";

export type PropsType = {
    users: Array<oneUserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    followingInProgress: Array<number>
    toggleFollowingProgress: (followingInProgress: boolean, userId: number) => void
}
//new version functional component
let UserS = (props: PropsType) => {
    let pagesCount = Math.ceil (props.totalUsersCount/ props.pageSize);
    let pages = [];
    for(let i=1; i<= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map( p  => {
                return <span className={props.currentPage === p ? styles.selectedPage: ''}
                             onClick={(event)=> {props.onPageChanged(p)}}>{p}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <NavLink to={'/profile/' + u.id}>
                    <img src={u.photos.small != null ? u.photos.small : people} className={styles.userPhoto}
                         alt='image'/>
                    </NavLink>
                </div>
                <div>
                    {u.followed
                        ? <button disabled={props.followingInProgress.some(id => id === u.id)}  onClick={() => {
                            props.toggleFollowingProgress(true, u.id);
                            usersAPI.unfollowUser(u.id)
                                .then(data => {
                                    if (data.resultCode === 0){
                                        props.unfollow(u.id);
                                    }
                           props.toggleFollowingProgress(false, u.id);
                                })
                        }}>Unfollow</button>
                        : <button  disabled={props.followingInProgress.some(id => id === u.id)}   onClick={() => {
                            //props.toggleFollowingProgress(true);
                            props.toggleFollowingProgress(true, u.id);
                            usersAPI.followUser(u.id)
                                .then(data => {
                                    if (data.resultCode === 0){
                                        props.follow(u.id);
                                    }
                                    props.toggleFollowingProgress(false, u.id);

                                })

                           /* axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},
                                {withCredentials: true,
                                    headers: {
                                        'API-KEY': 'dbddbad0-5fc7-4e37-91bc-35e6e35f65ef'
                                    }
                                })
                                .then(response => {
                                    if (response.data.resultCode === 0){
                                        props.follow(u.id);
                                    }
                                })*/

                        }}>Follow</button>
                    }
                </div>
            </span>
                <span>
                <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{"u.location.city"}</div>
                    <div>{"u.location.country"}</div>
                </span>
            </span>
            </div>)
        }
    </div>
}

export default UserS;