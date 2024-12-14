// eslint-disable-next-line no-unused-vars
import React from "react";
import meditationImage from "../../assets/meditation.png";
import "../../styles/Signup.css";

export default function BasicExample() {
    return (
        <section className="login-container">
            {/* login-wrapper: divise la page en deux sections: image et formulaire */}
            <div className="login-wrapper">
                {/* Left Section: Illustration */}
                <div className="illustration-section">
                    <img src={meditationImage}
                         alt="Meditation Illustration"
                         className="illustration-image"/>

                </div>

                {/* Right Section: Form */}
                <div className="form-section">
                    {/*Enveloppe intérieure du formulaire, gardant l'espacement et l'alignement propres.*/}
                    <div className="form-wrapper">
                        <h1 className="form-title">Welcome Back!</h1>
                        <p className="form-subtitle">
                            If you already have an account, please fill in this Login Form :
                        </p>

                        <form>
                            {/* Email input */}
                            <div className="floating-label">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="floating-input"
                                    placeholder=" "
                                />
                                <label htmlFor="email" className="floating-label-text">
                                    Email Address
                                </label>
                            </div>

                            {/* Password input */}
                            <div className="floating-label">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="floating-input"
                                    placeholder=" "
                                />
                                <label htmlFor="password" className="floating-label-text">
                                    Password
                                </label>
                            </div>

                            {/* Forgot Password Link */}
                            <div className="form-link">
                                <a href="/forget-password" className="forgot-password">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Login Button */}
                            <div className="form-group">
                                <button type="button" className="login-button">
                                    Login
                                </button>
                            </div>

                            {/* Sign Up Link */}
                            <p className="signup-text">
                                If you don’t have an account, you can sign up here:{" "}
                                <a href="/reset-password" className="signup-link">
                                    Sign Up
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
