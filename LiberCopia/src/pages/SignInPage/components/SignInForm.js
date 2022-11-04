import * as authenticator from "../../../redux/authenticator";
import TokenStorage from "../../../utils/storage/TokenStorage";
import UserStorage from "../../../utils/storage/UserStorage";
import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {signIn} from "../../../redux/authSlice";
import {Formik} from "formik";
import * as yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import '../../../assets/styles/_form.css'
import React from 'react';

function SignInForm() {

    const navigate = useNavigate()
    const ref = useRef();
    const dispatch = useDispatch();

    const [signInQuery, {error}] = authenticator.useSignInMutation();
    const submitForm = async () => {
        const body = {
            login: ref.current.values.username,
            passwordHash: ref.current.values.password
        }
        const data = await signInQuery(body).unwrap();
        TokenStorage.saveToken(data.token);
        UserStorage.saveUser(data.user);
        dispatch(signIn());
        navigate('/');
    }

    const validationSchema = yup.object().shape({
        username: yup.string().required('Required'),
        password: yup.string().required('Required').min(8, "Must be 8 or more symbols"),
    })

    return (
        <div>
            <h1 className='form__title'>Sign In</h1>
            <Formik
                innerRef={ref}
                initialValues={{
                    username: '',
                    password: '',
                }}
                validateOnBlur
                onSubmit={submitForm}
                validationSchema={validationSchema}
            >
                {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
                    <div className={'form'}>
                        <div className='form-body'>
                            <div className='form__group'>
                                <label htmlFor={'username'}>Username</label>
                                <input className={'input'} type={'text'} name={'username'} onChange={handleChange}
                                       onBlur={handleBlur} value={values.username}/>
                                {touched.username && errors.username && <p className={'error'}>{errors.username}</p>}
                            </div>
                            <div className='form__group'>
                                <label htmlFor={'password'}>Password</label>
                                <input className={'input'} type={'text'} name={'password'} onChange={handleChange}
                                       onBlur={handleBlur} value={values.password}/>
                                {touched.password && errors.password && <p className={'error'}>{errors.password}</p>}
                            </div>
                        </div>
                        <button className="form__button" type='submit' disabled={!isValid && !dirty}
                                onClick={handleSubmit}
                                onBlur={handleBlur}
                        >SIGN IN
                        </button>
                    </div>
                )}
            </Formik>
            <div className={'form__text_help'}>
                <span>
                    Create Account?
                </span>
                <Link className={'form__text_help_link'} to='/sign-up'> Sign Up</Link>
            </div>
        </div>
    );
}

export default SignInForm;