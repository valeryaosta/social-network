import React from 'react';
import s from './Post.module.css';

type MessageType = {
    message: string;
    likesCount: number;
}

const Post: React.FC<MessageType> = (props) => {
    return (
        <div className={s.item}>
            <div>
                <img src="https://it-doc.info/wp-content/uploads/2019/06/avatarka_dlya_devushki_.jpg" alt="some user"/>
                {props.message}
            </div>
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    );
}

export default Post;
