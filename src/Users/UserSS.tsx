import React from 'react';
import styles from "./Users.module.css";
import people from "../Assets/Images/people.png";
import {oneUserType} from "../Redux/users-reducer";

export type PropsType = {
    users: Array<oneUserType>
    follow: (userId: number) => void
    unfollow: (userID: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
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
                    <img src={u.photos.small != null ? u.photos.small : people} className={styles.userPhoto}
                         alt='image'/>
                </div>
                <div>
                    {u.followed
                        ? <button onClick={() => {
                            props.unfollow(u.id)
                        }}>Unfollow</button>
                        : <button onClick={() => {
                            props.follow(u.id)
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