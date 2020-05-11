import React, { useState } from 'react'
import { useFormik } from 'formik';
import { Redirect, NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { validateLogin } from '../../../utils/validators/validators';

import './SignIn.scss';

const SignIn = ({ login, isAuth }) => {
    const [isLoginError, toggleLoginError] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: validateLogin,
        onSubmit: async (values) => {
            const { email, password } = values;
            login(email, password)
                .catch((err) => toggleLoginError(true))
        },
        validateOnChange: false,
    });

    if (isAuth) return <Redirect to={"/profiles"} />

    return (
        <form onSubmit={formik.handleSubmit} className="form-sign-in">
            <h1 className="form-sign-in-header">Login:</h1>
            <TextField
                id="email"
                name="email"
                type="email"
                label="Email:"
                onChange={formik.handleChange}
                value={formik.values.email}
                helperText={formik.errors.email}
                error={!!formik.errors.email}
            />
            <TextField
                id="password"
                label="Password:"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                helperText={formik.errors.password}
                error={!!formik.errors.password}
            />
            <span className="sign-up-link">
                Are you not login yet? Let`s {" "}
                <NavLink className="sign-up-link-text" to="/signUp">register</NavLink>
                {" "} now!
            </span>
            <Button variant="contained" type="submit" classes={{ root: 'form-sign-in-submit' }}>
                Log In
      </Button>
            {isLoginError && <div className="sign-in-error">
                <p className="sign-in-error-message">Login or password are not correct</p>
            </div>}
        </form>
    )
}

export default SignIn;
