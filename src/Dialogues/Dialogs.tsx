import React, {ChangeEvent} from 'react';
import "./Dialogs.module.css";
import s from "./Dialogs.module.css";
import DialogueItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import { Redirect } from 'react-router-dom';


const Dialogs = (props: DialogsPropsType) => {
    let state = props.dialogsPage;

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogueItem name={d.name} id={d.id}/>);
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message}/>);
    let newMassageBody = props.dialogsPage.newMessageBody;

    let onSendMessageClick = () => {
        props.onSendMessageClick();
    }
    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value;
        props.onNewMessageChange(body);
    }
    if (!props.isAuth) return <Redirect to={'/login'} />

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div> <textarea onChange={onNewMessageChange}
                                    value={newMassageBody}
                                    placeholder="Enter your message"></textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;
