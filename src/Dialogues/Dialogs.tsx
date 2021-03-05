import React, {ChangeEvent} from 'react';
import "./Dialogs.module.css";
import s from "./Dialogs.module.css";
import DialogueItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {InitialDialogState, SendMessageCreator, UpdateNewMessageBodyCreator} from "../Redux/dialogs-reducer";
import {ReduxStoreType} from "../Redux/redux-store";
import {DialogsPageType, DialogsType, MessageType} from "../Redux/store";

type PropsType = {
    dialogs: Array<DialogsType>,
    messages: Array<MessageType>,
    newMessageBody: string
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
}

const Dialogs = (props: PropsType) => {

    let dialoguesElements = props.dialogs.map(d => <DialogueItem name={d.name} id={d.id}/>);
    let messagesElements = props.messages.map(m => <Message message={m.message}/>);
    let newMassageBody = props.newMessageBody;

    let onSendMessageClick = () => {
        props.sendMessage();
    }
    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value;
        props.updateNewMessageBody(body);

    }
    return (
        <div className={s.dialogues}>
            <div className={s.dialogueItems}>
                {dialoguesElements}
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
