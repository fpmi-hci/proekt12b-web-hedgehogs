import * as authenticator from "../../../redux/authenticator";
import TokenStorage from "../../../utils/storage/TokenStorage";
import UserStorage from "../../../utils/storage/UserStorage";
import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {signIn} from "../../../redux/authSlice";
import {Formik} from 'formik';
import * as yup from 'yup';
import {Link, useNavigate} from "react-router-dom";
import '../../../assets/styles/_form.css'
import React from 'react';

const SignUpForm = () => {

    const navigate = useNavigate()
    const ref = useRef();
    const dispatch = useDispatch();

    const [signUp, {error}] = authenticator.useSignUpMutation();
    const submitForm = async (event) => {
        const body = {
            "name": ref.current.values.name,
            "lastName": ref.current.values.lastName,
            "login": ref.current.values.username,
            "passwordHash": ref.current.values.password
        };
        const data = await signUp(body).unwrap();
        TokenStorage.saveToken(data.token)
        UserStorage.saveUser(data.user)
        dispatch(signIn())
        navigate("/")
    }


    const validationSchema = yup.object().shape({
        name: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
        username: yup.string().required('Required'),
        password: yup.string().required('Required').min(8, "Must be 8 or more symbols"),
    })

    return (
        <div>
            <h1 className='form__title'>Sign Up</h1>
            <Formik
                innerRef={ref}
                initialValues={{
                    name: '',
                    lastName: '',
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
                                <label htmlFor={'name'}>Name</label>
                                <input className={'input'} type={'text'} name={'name'} onChange={handleChange}
                                       onBlur={handleBlur} value={values.name}/>
                                {touched.name && errors.name && <p className={'error'}>{errors.name}</p>}
                            </div>
                            <div className='form__group'>
                                <label htmlFor={'lastName'}>Last Name</label>
                                <input className={'input'} type={'text'} name={'lastName'} onChange={handleChange}
                                       onBlur={handleBlur} value={values.lastName}/>
                                {touched.lastName && errors.lastName && <p className={'error'}>{errors.lastName}</p>}
                            </div>
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
                        >SIGN UP
                        </button>
                    </div>
                )}
            </Formik>
            <div className={'form__text_help'}>
                <span>
                    Already got an account?
                </span>
                <Link className={'form__text_help_link'} to='/sign-in'> Sign In</Link>
            </div>
        </div>

    )
}

export default SignUpForm