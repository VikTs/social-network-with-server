import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styles from './Login.module.css'

const LoginOrRegistration = () => {
    return (
        <div className={styles.loginOrRegistration} >
            <NavLink to='/signIn'>Login</NavLink>
            <NavLink to='/signUp'>Registaration</NavLink>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps)(LoginOrRegistration)