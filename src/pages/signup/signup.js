import { Form, Link, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import { signupService } from "../../services/user-service";

import * as constants from "../../constants";
import "./signup.css";

const successToast = () => toast.success(constants.SIGNUP_SUCCESS);
const failureToast = () => {toast.error(constants.SIGNUP_FAILED)};

function SignUp() {

    const firstnameRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        firstnameRef.current.focus();
    }, []);

    const handleSubmit = (values) => {
        
        signupService(values)
            .then(result => {
                const {data, status} = result;

                    if(status === 201) {
                        successToast();

                        setTimeout(() => {
                            navigate("/login");
                        }, 2800);
                    }
            })
            .catch(error => {
                console.log("Error: ", error);
                failureToast();
            })
    }

    const signUpForm = useFormik({
        
        initialValues: {
          firstName: "",
          lastName: "",
          email: "",
          password: ""
        },
        onSubmit: values => {handleSubmit(values)},
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .required('No password provided.') 
                .min(8, 'Password is too short - should be 8 chars minimum.')
          }),
    });

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
                    <button className="login-btn" type="submit" disabled={!signUpForm.isValid}>Register</button>
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
                    error: {
                        duration: 4000
                    }
                }}
            />
        </div>
    );
}

export default SignUp;