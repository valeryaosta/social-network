import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from "./MyPosts/Post/Post";
import {ActionTypes, PostType, RootStateType} from "../Redux/store";
import {addPostActionCreator, UpdateNewPostTextActionCreator} from "../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {ReduxStoreType} from "../Redux/redux-store";
import { connect } from 'react-redux';

//
// type MyPostsContainerPropsType = {
//     store: ReduxStoreType
// }
//
// const MyPostsContainer = (props: MyPostsContainerPropsType) => {
//     let state = props.store.getState();
//
//     let onAddPost = () => {
//         props.store.dispatch(addPostActionCreator());
//     }
//     let onPostChange = (text: string) => {
//
//         let action = UpdateNewPostTextActionCreator(text)
//         props.store.dispatch(action)
//     }
//
//     return (
//        <MyPosts updateNewPostText={onPostChange} addPost={onAddPost} posts={state.profilePage.posts}
//                  newPostText={state.profilePage.newPostText}/>
//     );
// }

const mapStateToProps = (state: RootStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch: (action: ActionTypes) => void) => {
    return {
        updateNewPostText: (text: string) => {
            let action = UpdateNewPostTextActionCreator(text)
            dispatch(action)
        },
        addPost: () => {
            dispatch(addPostActionCreator())
        }
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
