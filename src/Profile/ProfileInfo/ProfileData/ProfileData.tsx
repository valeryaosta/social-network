import React from 'react';
import {ProfileType} from "../../../Redux/profile-reducer";
import Contact from "./Contact/Contact";

type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    openEditMode: () => void
}

const ProfileData: React.FC<ProfileDataType> = ({profile, isOwner, openEditMode}) => {

    return <div>
        {isOwner && <div>
            <button onClick={openEditMode}>EDIT</button>
        </div>}

        <div><b>Full name</b>: {profile.fullName}</div>
        <div><b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}</div>
        {
            profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
        }

        <div><b>About me</b>: {profile.aboutMe}</div>

        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                //@ts-ignore
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            }
        )}
        </div>

    </div>
}


export default ProfileData;
