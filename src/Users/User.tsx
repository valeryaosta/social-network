import React from 'react';
import styles from "./Users.module.css";
import people from "../Assets/Images/people.png";
import {oneUserType} from "../Redux/users-reducer";
import {NavLink} from 'react-router-dom';

export type PropsType = {
    user: oneUserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}
//new version functional component
let User: React.FC<PropsType> = ({
                                     user,
                                     followingInProgress,
                                     follow,
                                     unfollow,

                                     ...props
                                 }) => {


    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : people} className={styles.userPhoto}
                         alt='image'/>
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      unfollow(user.id);

                                  }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      follow(user.id);

                                  }}>Follow</button>
                    }
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{"user.location.city"}</div>
                    <div>{"user.location.country"}</div>
                </span>
            </span>
        </div>)
}

export default User;