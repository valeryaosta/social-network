import React from 'react';
import s from "./../Dialogues.module.css";
import state from "../../Redux/state";

type MessageType = {
    message: string
}
const Message = (props: MessageType) => {
    return <div className={s.message}>{props.message}</div>
    }

export default Message;
