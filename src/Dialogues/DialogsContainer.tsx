import React, {ChangeEvent} from 'react';
import "./Dialogs.module.css";
import s from "./Dialogs.module.css";
import DialogueItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {SendMessageCreator, UpdateNewMessageBodyCreator} from "../Redux/dialogues-reducer";
import {ReduxStoreType} from "../Redux/redux-store";
import Dialogs from "./Dialogs";
import {ActionTypes, RootStateType} from "../Redux/store";
import {connect} from 'react-redux'

// type PropsType = {
//     store: ReduxStoreType
// }
//
// const DialogsContainer = (props: PropsType) => {
//
//     let dialogsPage = props.store.getState().dialogsPage;
//
//     let onSendMessageClick = () => {
//         props.store.dispatch(SendMessageCreator())
//     }
//     let onNewMessageChange = (body: string) => {
//         props.store.dispatch(UpdateNewMessageBodyCreator(body));
//     }
//
//     return <Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick}
//                     dialogsPage={dialogsPage}
//     />
// }

// state?????? store????
const mapStateToProps = (state: RootStateType) => {
    return {
        dialogs: state.dialogsPage.dialogues,
        messages: state.dialogsPage.messages,
        newMessageBody: state.dialogsPage.newMessageBody
    }
}

const mapDispatchToProps = (dispatch: (action: ActionTypes) => void) => {
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(UpdateNewMessageBodyCreator(body))
        },
        sendMessage: () => {
            dispatch(SendMessageCreator())
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer