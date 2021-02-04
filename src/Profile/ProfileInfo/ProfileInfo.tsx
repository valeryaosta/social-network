import React from 'react';
import s from '../ProfileInfo.module.css';


const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img
                    src="https://images.glaciermedia.ca/polopoly_fs/1.23204558.1557950041!/fileImage/httpImage/image.jpg_gen/derivatives/landscape_804/northern-lights.jpg"
                    alt="bigImage" className={s.img} />
            </div>
            <div className={s.descriptionBlock}>
                ava+description
            </div>
        </div>
    );
}

export default ProfileInfo;
