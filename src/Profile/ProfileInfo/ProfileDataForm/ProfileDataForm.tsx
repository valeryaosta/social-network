import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {ProfileType} from "../../../Redux/profile-reducer";
import {required} from '../../../Utils/Validators/validators';
import {Input, Textarea} from "../../../Common Components/FormsControls/FormsControls";
import s from '../../../Common Components/FormsControls/FormsControls.module.css';


export  type FormDataType = {}

export  type IProps = {
    profile: ProfileType
    initialValues: ProfileType
}

const ProfileDataForm: React.FC<InjectedFormProps<FormDataType, IProps> & IProps> =
    ({handleSubmit, profile, error}) => {
        return <form onSubmit={handleSubmit}>
            <div>
                <button>SAVE</button>
            </div>

            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div><b>Full Name</b>: {<Field placeholder={'Full Name'} name={'fullName'} component={Input}
                                           validate={[required]}/>}</div>
            <div><b>About Me</b>: {<Field placeholder={'About Me'} name={'aboutMe'} component={Textarea}
                                          validate={[required]}/>}</div>
            <div><b>Looking For A Job</b>: {<Field type={'checkbox'} value={'LookingForAJob'} name={'LookingForAJob'}
                                                   component={Input}/>}</div>
            <div><b>Looking For A Job Description</b>: {<Field placeholder={'Looking For A Job Description'}
                                                               name={'lookingForAJobDescription'} component={Textarea}
                                                               validate={[required]}/>}</div>


            <div><b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key={key}><b>{key}:</b><Field placeholder={key} name={`contacts.${key}`}
                                                          component={Input}/>
                </div>
            })}
            </div>

        </form>
    }


const ProfileDataReduxForm = reduxForm<FormDataType, IProps>({form: 'edit-mode-profile'})(ProfileDataForm)
export default ProfileDataReduxForm

