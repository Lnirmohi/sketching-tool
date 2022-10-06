import { Form, Link, useNavigate } from "react-router-dom";
import axios from "../../services/axios";
import { useRef, useEffect } from "react";
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';

import * as constants from "../../constants";
import "./signup.css";

const successToast = () => toast.success(constants.SIGNUP_SUCCES)  

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
                        }, 4000);
                    }
                });
        },
    });

    useEffect(() => {
        firstnameRef.current.focus();
    }, []);

    return (
        <div className="register-page">
            <div className="container">
                <p className="form-heading">Sign up</p>

                <Form onSubmit={signUpForm.handleSubmit}>
                    <input 
                        className="credentials" 
                        placeholder="First name" 
                        type="text" 
                        name="firstName"
                        ref={firstnameRef}
                        value={signUpForm.values.firstName}
                        onChange={signUpForm.handleChange}
                        required
                    />
                    <input 
                        className="credentials" 
                        placeholder="Last name" 
                        type="text" 
                        name="lastName"
                        value={signUpForm.values.lastName}
                        onChange={signUpForm.handleChange}
                        required
                    />
                    <input 
                        className="credentials" 
                        placeholder="Email address" 
                        type="email" 
                        name="email"
                        value={signUpForm.values.email}
                        onChange={signUpForm.handleChange}
                        required
                    />
                    <input 
                        className="credentials" 
                        placeholder="Password" 
                        type="password" 
                        name="password"
                        value={signUpForm.values.password}
                        onChange={signUpForm.handleChange}
                        required
                    />
                    <button className="login-btn" type="submit">Register</button>
                </Form>

                <section className="already-account-section">
                    <p>Already have an account?</p>
                    <Link to="/login">Log in</Link>
                </section>
            </div>
            
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 3800,
                    style: {
                    background: '#363636',
                    color: '#fff',
                    },
                    success: {
                    duration: 3000,
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