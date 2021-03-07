import React from 'react'
import styles from './Users.module.css'
import {oneUserType} from "../Redux/users-reducer";
import axios from "axios";
import people from './../Assets/Images/people.png' ;

type UsersPropsType = {
    users: Array<oneUserType>
    follow: (userId: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<oneUserType>) => void
}

class UsersC extends React.Component<UsersPropsType>{

    constructor(props: UsersPropsType) {
        super(props)
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            this.props.setUsers(response.data.items);
        })
    }

    render() {
        return <div>
            {/*<button onClick={this.getUsers}>Get Users</button>*/}
            {
                this.props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <img src={u.photos.small != null ? u.photos.small : people} className={styles.userPhoto}
                         alt='image'/>
                </div>
                <div>
                    {u.followed
                        ? <button onClick={() => {
                            this.props.unfollow(u.id)
                        }}>Unfollow</button>
                        : <button onClick={() => {
                            this.props.follow(u.id)
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

}

export default UsersC;