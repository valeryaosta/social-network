import React from 'react';
import s from "../Dialogs.module.css";
import state from "../../Redux/store";

type MessageType = {
    message: string
}
const Message = (props: MessageType) => {
    return <div className={s.message}>{props.message}</div>
    }

export default Message;
