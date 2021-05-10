import {maxLengthCreator, required} from "../../Utils/Validators/validators";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../Common Components/FormsControls/FormsControls";

export type FormAddMessageType = {
    newMessageBody: string
}

export const maxLength = maxLengthCreator(50)

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

export const AddMessageReduxForm = reduxForm<FormAddMessageType>({form: 'dialogAddMessageForm'})(AddMessageForm)