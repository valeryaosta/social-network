import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPostsContainer";
import {ProfilePropsType} from './ProfileInfo/ProfileContainer';

const Profile = (props: ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo profile={props.profile} isOwner={props.isOwner}
                         status={props.status} updateStatus={props.updateStatusProfile}
                         savePhoto={props.savePhoto} saveNewProfileData={props.saveNewProfileData}
            />
            <MyPostsContainer/>
        </div>
    );
}

export default Profile
