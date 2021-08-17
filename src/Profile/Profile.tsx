import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPostsContainer";
import {ProfilePropsType} from './ProfileInfo/ProfileContainer';


const Profile = (props: ProfilePropsType) => {


    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatusProfile}/>
            <MyPostsContainer/>
        </div>
    );
}

export default Profile
