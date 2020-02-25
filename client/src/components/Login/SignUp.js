import React from 'react'
import { reduxForm } from 'redux-form'
import { Input, CreateField } from '../common/FormsControls/FormsControls'
import { required } from '../../utils/validators/validators'
import style from '../common/FormsControls/FormsControls.module.css'

let SignUpForm = ({ handleSubmit, error }) => {

    return (
        <form onSubmit={handleSubmit}>
            {CreateField('Email', 'email', [required], Input)}
            {CreateField('Password', 'password', [required], Input, { type: "password" })}
            {CreateField('Name', 'name', [required], Input)}
            {CreateField('Surname', 'surname', [], Input)}
            {CreateField('Age', 'age', [], Input, { type: "number" })}
            {CreateField('City', 'city', [], Input)}
            {CreateField('Facebook', 'facebook', [], Input)}
            {CreateField('Youtube', 'youtube', [], Input)}

            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Registration</button>
            </div>
        </form>
    )
}

const SignUpFormReduxForm = reduxForm({
    form: 'registration'
})(SignUpForm)

export default SignUpFormReduxForm