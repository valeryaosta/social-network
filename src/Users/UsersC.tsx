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
    totalUsersCount: number
    pageSize: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
}

class UsersC extends React.Component<UsersPropsType>{

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);
        })
    }
    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
            this.props.setUsers(response.data.items);
        })
    }

    render() {
        let pagesCount = Math.ceil (this.props.totalUsersCount/ this.props.pageSize);
        let pages = [];
        for(let i=1; i<= pagesCount; i++) {
            pages.push(i)
        }

        return <div>
            <div>
                {pages.map( p  => {
                    //если тек.стр === p, тогда присобачиться класс selectedPage
                   return <span className={this.props.currentPage === p ? styles.selectedPage: ''}
                   onClick={(event)=> {this.onPageChanged(p)}}>{p}</span>
                })}
            </div>
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