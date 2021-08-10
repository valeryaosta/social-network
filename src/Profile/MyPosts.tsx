import React from 'react';
import s from './MyPosts.module.css';
import Post from "./MyPosts/Post/Post";
import {PostType} from "../Redux/profile-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../Utils/Validators/validators";
import {Textarea} from "../Common Components/FormsControls/FormsControls";


type PropsType = {
    posts: Array<PostType>
    addPost: (values: string) => void
}

type AddNewPostFormDataType = {
    newPostText: string
}

const MyPosts = React.memo((props: PropsType) => {
    console.log('render yo')
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    const onAddPost = (values: AddNewPostFormDataType) => {
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
})

const maxLength = maxLengthCreator(10);

const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newPostText" placeholder={"Add new post"} component={Textarea}
                    validate={[required, maxLength]}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}
const AddNewPostReduxForm = reduxForm<AddNewPostFormDataType>({form: 'profileAddNewPostForm'})(AddNewPostForm)

export default MyPosts;
