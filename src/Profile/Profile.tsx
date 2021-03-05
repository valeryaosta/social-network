import React from 'react';
import MyPosts from "./MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionTypes, RootStateType} from "../Redux/store";
import MyPostsContainer from "./MyPostsContainer";
import store, {ReduxStoreType} from "../Redux/redux-store";

type PropsType = {
   // store: ReduxStoreType
}

const Profile = (props: PropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer
            />
        </div>
    );
}

export default Profile;
