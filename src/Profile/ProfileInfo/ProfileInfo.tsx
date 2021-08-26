import React, {ChangeEvent, useState} from 'react';
import s from '../ProfileInfo.module.css';
import Preloader from "../../Common Components/Preloader/Preloader";
import {ProfileType} from '../../Redux/profile-reducer';
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import userPhoto from '../../Assets/Images/people.png'
import ProfileData from "./ProfileData/ProfileData";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";

type ProfileInfoType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string | null) => void
    isOwner: boolean
    savePhoto: (file: any) => void
    saveNewProfileData: (formData: any) => void
}

const ProfileInfo: React.FC<ProfileInfoType> = ({
                                                    profile, status, updateStatus,
                                                    isOwner, savePhoto, saveNewProfileData
                                                }) => {

    let [editMode, setEditMode] = useState<boolean>(false);

    const openEditMode = () => {
        setEditMode(true)
    }


    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        if (e.target.files.length) {
            // @ts-ignore
            savePhoto(e.target.files[0])
        }
    }

    const onSubmitEdit = (formData: any) => {
        // @ts-ignore
        saveNewProfileData(formData).then(() => {
            setEditMode(false)
        })
    }

    if (!profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} alt={'nice view'} className={s.mainPhoto}/>

                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                {
                    editMode
                        ? <ProfileDataForm profile={profile}
                            // @ts-ignore
                                           initialValues={profile}
                                           onSubmit={onSubmitEdit}/>
                        : <ProfileData profile={profile} isOwner={isOwner} openEditMode={openEditMode}/>
                }

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    );
}


export default ProfileInfo;
