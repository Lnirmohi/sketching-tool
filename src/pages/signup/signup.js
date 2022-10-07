import { Form, Link, useNavigate } from "react-router-dom";
import axios from "../../services/axios";
import { useRef, useEffect } from "react";
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';

import * as constants from "../../constants";
import "./signup.css";

const successToast = () => toast.success(constants.SIGNUP_SUCCESS)  

function SignUp() {

    const firstnameRef = useRef();
    const navigate = useNavigate();

    const signUpForm = useFormik({
        
        initialValues: {
          firstName: "",
          lastName: "",
          email: "",
          password: ""
        },
        onSubmit: values => {

            axios.post(constants.SIGNUP_URL, values)
                .then(result => {
                    const data = result.data;

                    if(result.status === 201) {
                        successToast();

                        setTimeout(() => {
                            navigate("/login");
                        }, 2800);
                    }
                });
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .required('No password provided.') 
                .min(8, 'Password is too short - should be 8 chars minimum.')
          }),
    });

    useEffect(() => {
        firstnameRef.current.focus();
    }, []);

    return (
        <div className="register-page">
            <div className="container">
                <p className="form-heading">Sign up</p>

                <Form onSubmit={signUpForm.handleSubmit} noValidate className="signup-form">
                    <input 
                        className="credentials" 
                        placeholder="First name" 
                        id="firstName"
                        type="text" 
                        name="firstName"
                        ref={firstnameRef}
                        value={signUpForm.values.firstName}
                        onChange={signUpForm.handleChange}
                        onBlur={signUpForm.handleBlur}
                        size="30"
                    />
                    {
                       signUpForm.touched.firstName && signUpForm.errors.firstName ? 
                            <div className="input-error">{signUpForm.errors.firstName}</div> 
                            : null
                    }
                    <input 
                        className="credentials" 
                        placeholder="Last name" 
                        id="lastName"
                        type="text" 
                        name="lastName"
                        value={signUpForm.values.lastName}
                        onChange={signUpForm.handleChange}
                        onBlur={signUpForm.handleBlur}
                        size="30"
                    />
                    {
                       signUpForm.touched.lastName && signUpForm.errors.lastName ? 
                            <div className="input-error">{signUpForm.errors.lastName}</div> 
                            : null
                    }
                    <input 
                        className="credentials" 
                        placeholder="Email address" 
                        id="email"
                        type="email" 
                        name="email"
                        value={signUpForm.values.email}
                        onChange={signUpForm.handleChange}
                        onBlur={signUpForm.handleBlur}
                        size="30"
                    />
                    {
                       signUpForm.touched.email && signUpForm.errors.email ? 
                            <div className="input-error">{signUpForm.errors.email}</div> 
                            : null
                    }
                    <input 
                        className="credentials" 
                        placeholder="Password" 
                        id="password"
                        type="password" 
                        name="password"
                        value={signUpForm.values.password}
                        onChange={signUpForm.handleChange}
                        onBlur={signUpForm.handleBlur}
                        size="30"
                    />
                    {
                       signUpForm.touched.password && signUpForm.errors.password ? 
                            <div className="input-error">{signUpForm.errors.password}</div> 
                            : null
                    }
                    <button className="login-btn" type="submit" disabled={signUpForm.isSubmitting || signUpForm.errors}>Register</button>
                </Form>

                <section className="already-account-section">
                    <p>Already have an account?</p>
                    <Link to="/login">Log in</Link>
                </section>
            </div>
            
            <Toaster
                position="bottom-center"
                reverseOrder={false}
                gutter={8}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 2500,
                    style: {
                    background: '#363636',
                    color: '#fff',
                    },
                    success: {
                    duration: 2500,
                    theme: {
                        primary: 'green',
                        secondary: 'black',
                    },
                    },
                }}
            />
        </div>
    );
}

export default SignUp;