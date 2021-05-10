import React from 'react';
import s from './MyPosts.module.css';
import Post from "./MyPosts/Post/Post";
import {PostType} from "../Redux/profile-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";


type PropsType = {
    posts: Array<PostType>
    addPost: (values: string) => void
}

type AddNewPostFormDataType = {
    newPostText: string
}

const MyPosts = (props: PropsType) => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    const onAddPost = (values: AddNewPostFormDataType) => {
        console.log(values)
        props.addPost(values.newPostText)
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostReduxForm onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}

const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormDataType>> = (props) => {
    console.log(props)
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newPostText" placeholder={"Add new post"} component={"textarea"}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}
const AddNewPostReduxForm = reduxForm<AddNewPostFormDataType>({form: 'profileAddNewPostForm'})(AddNewPostForm)

export default MyPosts;
