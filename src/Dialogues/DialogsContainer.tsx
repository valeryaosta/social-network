import "./Dialogs.module.css";
import {
    InitialDialogType,
    SendMessageCreator,
} from "../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from 'react-redux'
import {StoreType} from "../Redux/redux-store";
import {compose, Dispatch} from 'redux';
import {WithAuthRedirect} from '../HOC/AuthWithRedirect';
import {ComponentType} from "react";

type MapStatePropsType = {
    dialogsPage: InitialDialogType,
}
type MapDispatchPropsType = {
    onSendMessageClick: (newMessageBody: string) => void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType
const mapStateToProps = (state: StoreType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        onSendMessageClick: (newMessageBody) => {
            dispatch(SendMessageCreator(newMessageBody))
        }
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs);


