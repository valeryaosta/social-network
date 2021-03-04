import React, {ChangeEvent} from 'react';
import "./Dialogs.module.css";
import s from "./Dialogs.module.css";
import DialogueItem from "./DialogueItem/DialoguesItem";
import Message from "./Message/Message";
import {InitialDialogState, SendMessageCreator, UpdateNewMessageBodyCreator} from "../Redux/dialogues-reducer";
import {ReduxStoreType} from "../Redux/redux-store";
import {DialoguePageType} from "../Redux/store";

type PropsType = {
    dialogsPage: DialoguePageType
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
}

const Dialogs = (props: PropsType) => {

    //let state = props.store.getState().dialoguesPage;

    let dialoguesElements = props.dialogsPage.dialogues.map(d => <DialogueItem name={d.name} id={d.id}/>);
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message}/>);
    let newMassageBody = props.dialogsPage.newMessageBody;

    let onSendMessageClick = () => {
        //props.store.dispatch(SendMessageCreator())
        props.sendMessage();
    }
    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value;
        //props.store.dispatch(UpdateNewMessageBodyCreator(body));
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
