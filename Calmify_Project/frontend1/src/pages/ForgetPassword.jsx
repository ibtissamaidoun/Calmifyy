import React from "react";
import '../styles/ForgetPassword.css';

export default function ForgetPassword() {
    return (
        <div className="background">
            <div className="card">
                <h1 className="heading">Forgot your password?</h1>
                <p className="subheading">
                    Don&#39;t worry, it happens to the best of us! Let&#39;s get you back in.
                </p>
                <form className="form">
                    <label htmlFor="email" className="input-label">
                        Enter your email to recover your account:
                    </label>
                    {/* Floating Label Wrapper */}
                    <div className="floating-label">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="floating-input"
                        placeholder=" "
                    />
                        <label htmlFor="email" className="floating-label-text">
                            Your email
                        </label>
                    </div>
                    <button type="submit" className="submit-button">
                        Send Recovery link
                    </button>
                </form>
            </div>
        </div>
    );
}
