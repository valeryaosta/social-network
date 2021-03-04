import React from 'react';
import s from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";

type DialogueItemType = {
    id: number
    name: string
}

const DialogueItem = (props: DialogueItemType) => {
    let path = "/dialogues/" + props.id;

    return <div className={s.dialogue + ' ' + s.active}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
}

export default DialogueItem;
