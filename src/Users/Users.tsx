import React from 'react'
import styles from './Users.module.css'
import {oneUserType} from "../Redux/users-reducer";
import axios from "axios";
import people from './../Assets/Images/people.png' ;

//OLD VERSION functional component!!!!!!!!!!!!

type UsersPropsType = {
    users: Array<oneUserType>
    follow: (userId: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<oneUserType>) => void
}

const Users = (props: UsersPropsType) => {

    let getUsers = () => {
        if (props.users.length === 0) {

            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                props.setUsers(response.data.items);
            })
        }
    }

    return <div>
        <button onClick={getUsers}>Get Users</button>
        {
            props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <img src={u.photos.small != null ? u.photos.small : people} className={styles.userPhoto} alt='user shape'/>
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

export default Users;
