import React from 'react';
import {ActionTypes, PostType, RootStateType} from "../Redux/store";
import {addPostActionCreator, UpdateNewPostTextActionCreator} from "../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from 'react-redux';


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
