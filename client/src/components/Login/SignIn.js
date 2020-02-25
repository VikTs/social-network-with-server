import React from 'react'
import { reduxForm } from 'redux-form'
import { Input, CreateField } from '../common/FormsControls/FormsControls'
import { required } from '../../utils/validators/validators'
import style from '../common/FormsControls/FormsControls.module.css'

let SignInForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {CreateField('Email', 'email', [required], Input)}
            {CreateField('Password', 'password', [required], Input, { type: "password" })}
            {CreateField(null, 'rememberMe', [], Input, { type: "checkbox" }, 'Remember me')}

            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && CreateField('Symbols for image', 'captcha', [required], Input)}

            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const SignInReduxForm = reduxForm({ //hoc
    form: 'login' //уникальное строковое имя
    // форм много, им нужны индивидуальные имена, а стейт у всех них один
})(SignInForm) //форма,вокруг которой создаем редакс-форм

export default SignInReduxForm