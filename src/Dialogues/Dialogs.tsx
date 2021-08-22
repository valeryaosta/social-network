import React from 'react';
import "./Dialogs.module.css";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import { AddMessageReduxForm } from './AddMessageForm/AddMessageForm';

export type FormAddMessageType = {
    newMessageBody: string
}

const Dialogs = (props: DialogsPropsType) => {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message}/>);

    let addNewMessage = (values: FormAddMessageType) => {
        props.onSendMessageClick(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
            </div>
            <AddMessageReduxForm onSubmit={addNewMessage}/>
        </div>
    )
}

/*export const maxLength = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<FormAddMessageType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="newMessageBody" placeholder="Enter your message"
                       validate={[required, maxLength]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm<FormAddMessageType>({form: 'dialogAddMessageForm'})(AddMessageForm)*/

export default Dialogs;
