import React from 'react';
import s from '../ProfileInfo.module.css';
import Preloader from "../../Common Components/Preloader/Preloader";
import {ProfileType} from "../../Redux/store";
import ProfileStatus from "./ProfileStatus";

type ProfileInfoType = {
    profile: ProfileType | null
    //status: string
}

const ProfileInfo = (props: ProfileInfoType) => {
    if(!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            <div>
               {/* <img
                    src="https://images.glaciermedia.ca/polopoly_fs/1.23204558.1557950041!/fileImage/httpImage/image.jpg_gen/derivatives/landscape_804/northern-lights.jpg"
                    alt="bigImage" className={s.img}/>*/}
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large} />

                <ProfileStatus status={'Hello my friends'} />
            </div>
        </div>
    );
}

export default ProfileInfo;
