import React from 'react'
import styles from './Users.module.css'
import {oneUserType} from "../Redux/users-reducer";


type UsersPropsType = {
    users: Array<oneUserType>
    follow: (userId: number) => void
    unfollow: (userID: number) => void
    setUsers: (users:Array<oneUserType>) => void
}

const Users = (props: UsersPropsType) => {
    if (props.users.length === 0) {
        props.setUsers ([
            {id: 1,
                photoUrl: 'https://www.vokrug.tv/pic/person/3/b/2/a/3b2a14a17798e77b69961fd22b5152f5.jpg',
                followed: false, fullName: "Elena D.", status: 'Waiting for you', location: {city: 'Minsk', country: 'Belarus'}},
            {id: 2,
                photoUrl: 'https://m.media-amazon.com/images/M/MV5BM2ZhZmM0M2MtZDQ4Ni00ZTAyLTkyODQtNGJkZTE2NDc0NzNkXkEyXkFqcGdeQXVyNjk1MjYyNTA@._V1_UY209_CR4,0,140,209_AL_.jpg',
                followed: true, fullName: "Victor R.", status: 'What is new?', location: {city: 'Toronto', country: 'Canada'}},
            {id: 3,
                photoUrl: 'http://images4.fanpop.com/image/photos/17100000/ian-somerhalder-damon-salvatore-17181930-388-480.jpg',
                followed: true, fullName: "John G.", status: 'Looking for something', location: {city: 'Tokyo', country: 'Japan'}},
            {id: 4,
                photoUrl: 'https://list.lisimg.com/image/16219914/450full.jpg',
                followed: false, fullName: "Kate H.", status: 'Next time..', location: {city: 'Barcelona', country: 'Spain'}},
        ],)
    }
    return <div>
        {
            props.users.map (u => <div key={u.id} >
            <span>
                <div>
                    <img src={u.photoUrl} className={styles.userPhoto} alt='image'/>
                </div>
                <div>
                    {u.followed
                        ? <button onClick={ () => { props.unfollow(u.id)} } >Unfollow</button>
                        : <button onClick={ () => { props.follow(u.id) } }>Follow</button>
                    }
                </div>
            </span>
            <span>
                <span>
                    <div>{u.fullName}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{u.location.city}</div>
                    <div>{u.location.country}</div>
                </span>
            </span>

            </div>)
        }
    </div>
}

export default Users;