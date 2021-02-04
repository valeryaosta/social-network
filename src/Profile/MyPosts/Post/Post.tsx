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
                <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/guNQz8J5NFsBrUS8JwXVoB8yvCE.jpg"/>
                {props.message}
            </div>
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    );
}

export default Post;
