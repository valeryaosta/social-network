import React from 'react';
import {Field, WrappedFieldProps} from 'redux-form';
import styles from './FormsControls.module.css';


// +also can use -- type React.FC<WrappedFieldProps & InputHTMLAttributes<HTMLInputElement>>

export const FormControl: React.FC<WrappedFieldProps> = ({input, meta:{touched, error}, children, ...props}) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, children, ...restProps} = props;
    return <FormControl {...props}>
        <textarea {...input} {...restProps}/>
    </FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, children, ...restProps} = props;
    return <FormControl {...props}>
        <input {...input} {...restProps}/>
    </FormControl>
}

export const createField =
    (placeholder: string | null,
     name: string,
     validators: any,
     component: any,
     props?: any,
     text = ''
    ) => <div>
            <Field placeholder={placeholder} name={name} component={component}
                   validate={validators}
                   {...props}
            />{text}
        </div>
