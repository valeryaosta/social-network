import React, {ChangeEvent} from 'react';
import "./Dialogs.module.css";
import s from "./Dialogs.module.css";
import DialogueItem from "./DialogueItem/DialoguesItem";
import Message from "./Message/Message";
import {SendMessageCreator, UpdateNewMessageBodyCreator} from "../Redux/dialogues-reducer";
import {ReduxStoreType} from "../Redux/redux-store";
import Dialogs from "./Dialogs";

type PropsType = {
    store: ReduxStoreType
}

const DialogsContainer = (props: PropsType) => {

    let dialogsPage = props.store.getState().dialoguesPage;

    //let dialoguesElements = state.dialogues.map(d => <DialogueItem name={d.name} id={d.id}/>);
    //let messagesElements = state.messages.map(m => <Message message={m.message}/>);
    //let newMassageBody = state.newMessageBody;

    let onSendMessageClick = () => {
        props.store.dispatch(SendMessageCreator())
    }
    let onNewMessageChange = (body: string) => {
        props.store.dispatch(UpdateNewMessageBodyCreator(body));
    }

    return <Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick}
                    dialogsPage={dialogsPage}
    />

}

export default DialogsContainer;
