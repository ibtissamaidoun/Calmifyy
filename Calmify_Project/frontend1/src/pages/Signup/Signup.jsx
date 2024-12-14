// eslint-disable-next-line no-unused-vars
import '../../styles/Signup.css';
// eslint-disable-next-line no-unused-vars
import React from "react";
import { TEInput, TERipple } from "tw-elements-react";

export default function BasicExample() {
    return (
        <section className="h-screen">
            <div className="h-full">
                <div className="flex h-full items-center justify-center">
                    <div className="w-full max-w-md">
                        <form>
                            {/* Sign in section */}
                            <div className="flex flex-row items-center justify-center lg:justify-start">
                                <p className="mb-0 mr-4 text-lg">Sign in with</p>

                                {/* Social media buttons */}
                                <TERipple rippleColor="light">
                                    <button type="button" className="mx-1 social-button">
                                        <i className="fab fa-facebook-f"></i>
                                    </button>
                                </TERipple>
                                <TERipple rippleColor="light">
                                    <button type="button" className="mx-1 social-button">
                                        <i className="fab fa-twitter"></i>
                                    </button>
                                </TERipple>
                                <TERipple rippleColor="light">
                                    <button type="button" className="mx-1 social-button">
                                        <i className="fab fa-linkedin-in"></i>
                                    </button>
                                </TERipple>
                            </div>

                            {/* Separator */}
                            <div className="my-4 flex items-center">
                                <p className="mx-4 mb-0 text-center font-semibold">Or</p>
                            </div>

                            {/* Email input */}
                            <div className="mb-6">
                                <TEInput
                                    type="email"
                                    placeholder="Email address"
                                    size="lg"
                                    className="input-field"
                                ></TEInput>
                            </div>

                            {/* Password input */}
                            <div className="mb-6">
                                <TEInput
                                    type="password"
                                    placeholder="Password"
                                    className="input-field"
                                    size="lg"
                                ></TEInput>
                            </div>

                            {/* Remember Me and Forgot Password */}
                            <div className="mb-6 flex">
                                <div>
                                    <input
                                        type="checkbox"
                                        id="remember-me"
                                        className="mr-2"
                                    />
                                    <label htmlFor="remember-me">Remember me</label>
                                </div>
                                <a href="#!" className="text-link">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Login button */}
                            <div className="text-center">
                                <TERipple rippleColor="light">
                                    <button
                                        type="button"
                                        className="login-button"
                                    >
                                        Login
                                    </button>
                                </TERipple>

                                <p className="mt-2 pt-1 text-sm font-semibold">
                                    Don't have an account?{" "}
                                    <a href="#!" className="text-danger">
                                        Register
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}