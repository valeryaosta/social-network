import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from "./MyPosts/Post/Post";
import {RootStateType} from "../Redux/state";

type PropsType = {
    message : string
    state: RootStateType
    addPost: (postText: string) => void
    updateNewPostText: (newPostText: string) => void
}

const MyPosts = (props: PropsType) => {
    let postsElements = props.state.profilePage.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)
    let addPost = () => {
            props.addPost(props.message);
    }
    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} value={props.message}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;
