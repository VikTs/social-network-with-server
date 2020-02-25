import React from 'react'
import { connect } from 'react-redux'
import { login, registration } from '../redux/auth-reducer'
import { Redirect } from 'react-router-dom'
import SignInReduxForm from './SignIn'
import SignUpFormReduxForm from './SignUp'

const Login = (props) => {
    const onSubmit = (formData) => {
        if (props.loginType === "signIn") {
            props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
        } else if (props.loginType === "signUp") {
            props.registration(
                formData.email, formData.password,
                formData.name, formData.surname,
                formData.age, formData.city,
                formData.facebook, formData.youtube)
        }
    }
    if (props.isAuth) {
        return <Redirect to={"/profiles"} />
    }
    return (
        <div>
            <h1>{props.loginType}</h1>
            {props.loginType === "signIn" ?
                <SignInReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} /> :
                <SignUpFormReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />}
        </div>)
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login, registration })(Login)