import React from 'react';
import "./Dialogs.module.css";
import {SendMessageCreator, UpdateNewMessageBodyCreator} from "../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {ActionTypes, RootStateType} from "../Redux/store";
import {connect} from 'react-redux'


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
