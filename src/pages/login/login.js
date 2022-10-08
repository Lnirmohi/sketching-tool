import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { AuthContext } from "../../services/authenticate";
import toast, { Toaster } from 'react-hot-toast';
import { loginService } from "../../services/user-service";

import { useRef, useEffect, useContext } from "react";
import * as Yup from 'yup';

import * as constants from "../../constants";
import "./login.css";

const failureToast = () => {toast.error(constants.LOGIN_FAILED)};

function Login() {

    const emailRef = useRef();
    const {setAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const LoginSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
            .required('No password provided.') 
            .min(8, 'Password is too short - should be 8 chars minimum.')
    });

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const handleSubmit = (values) => {

        console.log(values);
        

        loginService(values)
            .then(result => {
                const {data, status} = result;
                const {token, email} = data;

                if (status === 200) {

                    setAuth({token, email});
                    
                    window.localStorage.setItem(
                        'token', token
                    );

                    navigate("/sketch");
                }
            }).catch(error => {

                console.log("Error: ", error);
                failureToast();
            })
    }

    const loginForm = useFormik({
        
        initialValues: {
          email: "",
          password: ""
        },
        onSubmit: (values) => {handleSubmit(values)},
        validationSchema: LoginSchema,
    });

    return (
        <div className="login-page">
            <div className="container">
                <p className="form-heading">Login to continue</p>

                <form onSubmit={loginForm.handleSubmit} noValidate className="login-form">
                    <input 
                        className="credentials" 
                        placeholder="Email"
                        id="email" 
                        type="email" 
                        name="email"
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                        value={loginForm.values.email}
                        ref={emailRef}
                        size="30"
                    />
                    {
                       loginForm.touched.email &&loginForm.errors.email ? 
                            <span className="input-error">{loginForm.errors.email}</span> 
                            : null
                    }
                    <input 
                        className="credentials" 
                        placeholder="Password"
                        id="password" 
                        type="password" 
                        name="password"
                        onChange={loginForm.handleChange} 
                        onBlur={loginForm.handleBlur}
                        value={loginForm.values.password}
                        size="30"
                    />
                    
                    {
                       loginForm.touched.password &&loginForm.errors.password ? 
                            <span className="input-error">{loginForm.errors.password}</span> 
                            : null
                    }

                    <button className="login-btn" type="submit" disabled={!loginForm.isValid}>Login</button>
                </form>

                <section className="no-account-section">
                    <p>Don't have an account?</p>
                    <Link to="/signup">Sign Up</Link>
                </section>
            </div>
            <Toaster 
                toastOptions={{
                    duration: 4000
                }}
            />
        </div>
    );
}

export default Login;