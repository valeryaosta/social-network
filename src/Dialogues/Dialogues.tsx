import React from 'react';
import "./Dialogues.module.css";
import s from "./Dialogues.module.css";
import {NavLink} from "react-router-dom";
import DialogueItem from "./DialogueItem/DialoguesItem";
import Message from "./Message/Message";
import state from "../Redux/state";
import {RootStateType} from "../Redux/state";

type PropsType = {
    state: RootStateType
}

const Dialogues = (props: PropsType) => {

    let dialoguesElements = props.state.dialoguesPage.dialogues.map(d => <DialogueItem name={d.name} id={d.id}/>);
    let messagesElements = props.state.dialoguesPage.messages.map(m => <Message message={m.message}/>);

    return (
        <div className={s.dialogues}>
            <div className={s.dialogueItems}>
                {dialoguesElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogues;
