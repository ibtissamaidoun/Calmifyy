// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import '../../Styles/Signup.css';
import lotusIcon from '../../assets/lotus.svg';
import waveTop from '../../assets/wave-top.svg';
import waveBottom from '../../assets/wave-bottom.svg';
import arc from '../../assets/arc.svg';
import meditation from '../../assets/meditation.svg';
const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        educationalLevel: '',
        university: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                {/* Left Side */}
                <div className="left-side">
                    {/*<div className="arc"></div>*/}
                    <img src={arc} alt="Decorative arc" className="arc"/>
                    <img src={lotusIcon} alt="Lotus" className="lotus-icon"/>
                    <img src={waveTop} alt="" className="wave wave-top"/>
                    <img src={waveBottom} alt="" className="wave wave-bottom"/>
                    <img src={meditation} alt="" className="meditation-icon"/>
                    {/*<div className="meditation-icon">*/}
                    {/*    <svg className="meditation-svg" viewBox="0 0 100 100">*/}
                    {/*        <path*/}
                    {/*            d="M50 70c-8.284 0-15-6.716-15-15 0-8.284 6.716-15 15-15 8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15z"*/}
                    {/*            fill="white"/>*/}
                    {/*    </svg>*/}
                    {/*</div>*/}
                    <h2>Join our stress-free community<br/>for a balanced life!</h2>
                </div>

                {/* Right Side */}
                <div className="right-side">
                    <div className="form-container">
                        <h1>Create an account</h1>
                        <p className="subtitle">Let's start your journey to balance and calmness.</p>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                            <input
                                type="date"
                                name="dateOfBirth"
                                placeholder="Date of Birth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="gender"
                                placeholder="Gender"
                                value={formData.gender}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="educationalLevel"
                                placeholder="Educational level"
                                value={formData.educationalLevel}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="university"
                                placeholder="University"
                                value={formData.university}
                                onChange={handleChange}
                            />

                            <div className="form-footer">
                                <p className="learn-more">Learn how Calmify helps you manage stress</p>

                                <button type="submit" className="continue-btn">Continue</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;