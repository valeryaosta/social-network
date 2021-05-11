import React from 'react';
import s from '../ProfileInfo.module.css';
import Preloader from "../../Common Components/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import {ProfileType} from '../../Redux/profile-reducer';

type ProfileInfoType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string | null) => void
}

const ProfileInfo = (props: ProfileInfoType) => {

    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large} alt={'nice view'}/>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    );
}

export default ProfileInfo;
