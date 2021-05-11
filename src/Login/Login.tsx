import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from '../Common Components/FormsControls/FormsControls';
import {login} from '../Redux/auth-reducer';
import {required} from '../Utils/Validators/validators';
import {StoreType} from "../Redux/redux-store";
import style from "../Common Components/FormsControls/FormsControls.module.css"

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Email"} name={"email"} component={Input}
                       validate={[required]}
                />
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} type={"password"} component={Input}
                       validate={[required]}
                />
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={Input}/>remember me
            </div>
            { props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

type MSTPType = {
    isAuth: boolean
}

type MDTPType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}

export type LoginPropsType = MSTPType & MDTPType

const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state: StoreType): MSTPType => ({
    isAuth: state.authState.isAuth
})

export default connect(mapStateToProps, {login})(Login);
