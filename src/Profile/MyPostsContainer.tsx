import {addPostActionCreator, PostType} from "../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {StoreType} from "../Redux/redux-store";

type MapStatePropsType = {
    posts: Array<PostType>
    newPostText: string
}
type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}
export type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: StoreType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostActionCreator(newPostText))
        }
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
