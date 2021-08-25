import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input} from '../Common Components/FormsControls/FormsControls';
import {login} from '../Redux/auth-reducer';
import {required} from '../Utils/Validators/validators';
import {StoreType} from "../Redux/redux-store";
import style from "../Common Components/FormsControls/FormsControls.module.css"

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>

            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required], Input, {type: "password"})}
            {createField(null, "rememberMe", null, Input, {type: "checkbox"}, "remember me")}


            {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
            {captchaUrl &&  createField("Symbols from image", "captcha", [required], Input, {})}

            {/*<Field placeholder={"Email"} name={"email"} component={Input}
                       validate={[required]}/>
                <Field placeholder={"Password"} name={"password"} type={"password"} component={Input}
                       validate={[required]}/>
                <Field type={"checkbox"} name={"rememberMe"} component={Input}/> remember me*/}

            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType, LoginFormOwnProps>({form: 'login'})(LoginForm)

type MSTPType = {
    isAuth: boolean
    captcha: null | string
}

type MDTPType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void

}

export type LoginPropsType = MSTPType & MDTPType

const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captcha}
        />
    </div>
}

const mapStateToProps = (state: StoreType): MSTPType => ({
    captcha: state.authState.captchaUrl,
    isAuth: state.authState.isAuth
})

export default connect(mapStateToProps, {login})(Login);
