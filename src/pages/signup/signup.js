import { Form } from "react-router-dom";
import "./signup.css";

function SignUp() {

    return (
        <div className="register-page">
            <div className="container">
                <p className="form-heading">Sign up</p>
                <Form method="" action="">
                    <input className="credentials" placeholder="First name" type="text" name="firstname" />
                    <input className="credentials" placeholder="Last name" type="text" name="lastname" />
                    <input className="credentials" placeholder="Email address" type="email" name="email" />
                    <input className="credentials" placeholder="Password" type="password" name="password" />
                    <button className="login-btn" type="button">Register</button>
                </Form>
                <section className="already-account-section">
                    <p>Already have an account?</p>
                    <a href="">Log in</a>
                </section>
            </div>
        </div>
    );;
}

export default SignUp;