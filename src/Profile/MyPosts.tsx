import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from "./MyPosts/Post/Post";
import {ActionTypes, PostType} from "../Redux/store";
import {addPostActionCreator, UpdateNewPostTextActionCreator} from "../Redux/profile-reducer";

type PropsType = {
    newPostText: string
    posts: Array<PostType>
    updateNewPostText: (text: string) => void
    addPost: () => void
}


const MyPosts = (props: PropsType) => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    let onAddPost = () => {
        props.addPost();
    }
    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        props.updateNewPostText(text)
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;
