import React from 'react'
import styles from './FormsControls.module.css'
import { Field } from 'redux-form'

const FormsControl = ({ input, meta: {touched, error}, children }) => {
    const hasError = touched && error
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span> {`Error: ${error}`} </span>}
        </div>
    )
}

export const Textarea = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormsControl {...props}> <textarea {...restProps} {...input} /> </FormsControl>
}

export const Input = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormsControl {...props}> <input {...restProps} {...input} /> </FormsControl>
}

export const CreateField = (placeholder, name, validators, component, props=[], text='') => (
    <div>
        <Field placeholder={placeholder} name={name}
            validate={validators}
            component={component}
            {...props} /> {text}
    </div>
)