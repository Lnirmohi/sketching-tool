import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import axios from "../../services/axios";
import * as constants from "../../constants";

import "./login.css";
import { useRef, useEffect } from "react";

function Login() {

    const emailRef = useRef();

    const loginForm = useFormik({
        
        initialValues: {
          email: "",
          password: ""
        },
        onSubmit: values => {
            console.log(values);
            axios.post(constants.LOGIN_URL, values)
                .then(result => {
                    console.log(result);
                });
        },
    });

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    return (
        <div className="login-page">
            <div className="container">
                <p className="form-heading">Login to continue</p>

                <form onSubmit={loginForm.handleSubmit}>
                    <input 
                        className="credentials" 
                        placeholder="Email" 
                        type="email" 
                        name="email"
                        onChange={loginForm.handleChange}
                        value={loginForm.values.email}
                        required
                        ref={emailRef}
                    />
                    <input 
                        className="credentials" 
                        placeholder="Password" 
                        type="password" 
                        name="password"
                        onChange={loginForm.handleChange} 
                        value={loginForm.values.password}
                        required
                    />
                    <button className="login-btn" type="submit">Login</button>
                </form>

                <section className="no-account-section">
                    <p>Don't have an account?</p>
                    <Link to="/signup">Sign Up</Link>
                </section>
            </div>
        </div>
    );
}

export default Login;