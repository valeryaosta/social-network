import React, {ChangeEvent} from 'react';
import "./Dialogues.module.css";
import s from "./Dialogues.module.css";
import DialogueItem from "./DialogueItem/DialoguesItem";
import Message from "./Message/Message";
import {StoreType} from "../Redux/state";
import {SendMessageCreator, UpdateNewMessageBodyCreator} from "../Redux/dialogues-reducer";

type PropsType = {
    store: StoreType
}

const Dialogues = (props: PropsType) => {

    let state = props.store.getState().dialoguesPage;

    let dialoguesElements = state.dialogues.map(d => <DialogueItem name={d.name} id={d.id}/>);
    let messagesElements = state.messages.map(m => <Message message={m.message}/>);
    let newMassageBody = state.newMessageBody;

    let onSendMessageClick = () => {
        props.store.dispatch(SendMessageCreator())
    }
    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value;
        props.store.dispatch(UpdateNewMessageBodyCreator(body));
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

export default Dialogues;
