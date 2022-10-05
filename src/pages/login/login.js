import { Form } from "react-router-dom";
import "./login.css";

function Login() {

    return (
        <div className="login-page">
            <div className="container">
                <h2>Login to continue</h2>
                <Form method="" action="">
                    <input className="credentials" placeholder="Email" type="email" name="email" />
                    <input className="credentials" placeholder="Password" type="password" name="password" />
                    <button className="login-btn" type="button">Login</button>
                </Form>
                <section className="no-account-section">
                    <p>Don't have an account?</p>
                    <a href="">Sign Up</a>
                </section>
            </div>
        </div>
    );
}

export default Login;