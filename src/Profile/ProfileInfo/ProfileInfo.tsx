import React, {ChangeEvent} from 'react';
import s from '../ProfileInfo.module.css';
import Preloader from "../../Common Components/Preloader/Preloader";
import {ProfileType} from '../../Redux/profile-reducer';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../Assets/Images/people.png'

type ProfileInfoType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string | null) => void
    isOwner: boolean
    savePhoto: (file: any) => void
}

const ProfileInfo: React.FC<ProfileInfoType> = ({profile, status, updateStatus, isOwner, savePhoto}) => {

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        if (e.target.files.length) {
            // @ts-ignore
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} alt={'nice view'} className={s.mainPhoto}/>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    );
}

export default ProfileInfo;
