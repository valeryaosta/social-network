import React from 'react';
import "./Dialogs.module.css";
import {
    InitialDialogType,
    SendMessageCreator,
    UpdateNewMessageBodyCreator
} from "../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from 'react-redux'
import {StoreType} from "../Redux/redux-store";
import { Dispatch } from 'redux';

type MapStatePropsType = {
    dialogsPage: InitialDialogType,
    isAuth: boolean
}
type MapDispatchPropsType = {
    onNewMessageChange: (body: string) => void
    onSendMessageClick: () =>  void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType
const mapStateToProps = (state: StoreType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.authState.isAuth
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType  => {
    return {
        onNewMessageChange: (body: string) => {
            dispatch(UpdateNewMessageBodyCreator(body))
        },
        onSendMessageClick: () => {
            dispatch(SendMessageCreator())
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
export default DialogsContainer
