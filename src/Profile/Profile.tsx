import React from 'react';
import MyPosts from "./MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {RootStateType} from "../Redux/state";
import state from "../Redux/state";

type PropsType = {
    state: RootStateType
    addPost: (postText: string) => void
    updateNewPostText: (newText: string) => void
}

const Profile = (props: PropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts message={state.profilePage.newPostText}
                     state={props.state}
                     addPost={props.addPost}
                     updateNewPostText={props.updateNewPostText}
            />
        </div>
    );
}

export default Profile;
