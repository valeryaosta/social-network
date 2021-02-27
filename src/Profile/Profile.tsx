import React from 'react';
import MyPosts from "./MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionTypes, RootStateType} from "../Redux/store";

type PropsType = {
    state: RootStateType
    dispatch: (action: ActionTypes) => void
}

const Profile = (props: PropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts message={props.state.profilePage.newPostText}
                     posts={props.state.profilePage.posts}
                     dispatch={props.dispatch}
            />
        </div>
    );
}

export default Profile;
