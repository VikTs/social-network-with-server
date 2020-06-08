import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Redirect, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { validateRegister } from '../../../utils/validators/validators';

import './SignUp.scss';

const SignUp = ({ registration, isAuth, getMyData }) => {
    const [registerError, setRegisterError] = useState('');
    const { goBack } = useHistory();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirm: '',
            name: '',
            surname: '',
            age: 14,
            city: '',
            facebook: '',
            youtube: '',
        },
        validate: validateRegister,
        onSubmit: (values) => {
            registration(values)
                .then(async(info) => await getMyData())
                .catch((err) => {
                    setRegisterError(err.message)
                });
        },
        validateOnChange: false,
    });

    if (isAuth) return <Redirect to={"/profiles"} />

    const handleGoBack = () => goBack();

    return (
        <>
            <button type="button" className="go-back sign-up">
                <ArrowBackIcon onClick={handleGoBack} />
            </button>
            <form onSubmit={formik.handleSubmit} className="form-sign-up">
                <h1 className="form-sign-up-header">Registration:</h1>
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
                <TextField
                    id="password-confirm"
                    label="Confirm password:"
                    name="passwordConfirm"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirm}
                    helperText={formik.errors.passwordConfirm}
                    error={!!formik.errors.passwordConfirm}
                />
                <TextField
                    id="name"
                    label="Name:"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    helperText={formik.errors.name}
                    error={!!formik.errors.name}
                />
                <TextField
                    id="surname"
                    label="Surname:"
                    name="surname"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.surname}
                    helperText={formik.errors.surname}
                    error={!!formik.errors.surname}
                />
                <TextField
                    id="age"
                    label="Age:"
                    name="age"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.age}
                    helperText={formik.errors.age}
                    error={!!formik.errors.age}
                    InputProps={{ inputProps: { max: 100, min: 14 } }}
                />
                <TextField
                    id="city"
                    label="City:"
                    name="city"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                    helperText={formik.errors.city}
                    error={!!formik.errors.city}
                />
                <TextField
                    id="facebook"
                    label="Facebook:"
                    name="facebook"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.facebook}
                    helperText={formik.errors.facebook}
                    error={!!formik.errors.facebook}
                />
                <TextField
                    id="youtube"
                    label="Youtube:"
                    name="youtube"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.youtube}
                    helperText={formik.errors.youtube}
                    error={!!formik.errors.youtube}
                />
                <Button variant="contained" type="submit" className="form-sign-up-submit">
                    Register
      </Button>
                {registerError && <div className="sign-up-error">
                    <p className="sign-up-error-message">Registration denied: this email is registered</p>
                </div>}
            </form>
        </>
    )
}

export default SignUp;
