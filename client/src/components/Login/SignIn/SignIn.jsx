import React, { useState } from 'react'
import { useFormik } from 'formik';
import { Redirect, NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { validateLogin } from '../../../utils/validators/validators';

import './SignIn.scss';
import { FormHelperText } from '@material-ui/core';

const SignIn = ({ login, isAuth }) => {
    const [isLoginError, toggleLoginError] = useState(false);
    const [showPassword, toggleShowPassword] = useState(false);
    const handleClickShowPassword = () => toggleShowPassword(!showPassword);

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
        <form onSubmit={formik.handleSubmit} className="sign-in-form">
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
            <FormControl>
                <InputLabel htmlFor="password">Password:</InputLabel>
                <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={!!formik.errors.password}
                    aria-describedby="password-error"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <FormHelperText id="password-error" error> {formik.errors.password} </FormHelperText>
            </FormControl>
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
