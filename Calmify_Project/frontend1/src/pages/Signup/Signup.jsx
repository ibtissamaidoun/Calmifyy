// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import '../../Styles/Signup.css';
import lotusIcon from '../../assets/lotus.svg';
import waveTop from '../../assets/wave-top.svg';
import waveBottom from '../../assets/wave-bottom.svg';
import arc from '../../assets/arc.svg';
import meditation from '../../assets/meditation.svg';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Signup = () => {
    // State for password visibility toggle
    const [showPassword, setShowPassword] = useState(false);

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
                        <p className="subtitle">Let&#39;s start your journey to balance and calmness.</p>

                        <form onSubmit={handleSubmit}>
                            {/* Full Name */}
                            <div className="floating-label-Signup">
                                <input
                                    type="text"
                                    name="fullName"
                                    className="floating-input-Signup"
                                    placeholder=" "
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                                <label className="floating-label-text-Signup">Full Name</label>
                            </div>

                            {/* Email Address */}
                            <div className="floating-label-Signup">
                                <input
                                    type="email"
                                    name="email"
                                    className="floating-input-Signup"
                                    placeholder=" "
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <label className="floating-label-text-Signup">Email Address</label>
                            </div>

                            {/* Password with toggle */}
                            <div className="floating-label-Signup">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="floating-input-Signup"
                                    placeholder=" "
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <label className="floating-label-text-Signup">Password</label>
                                <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <Visibility className="password-icon"/> : <VisibilityOff className="password-icon"/>}
        </span>
                            </div>

                            {/* Phone Number */}
                            <div className="floating-label-Signup">
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    className="floating-input-Signup"
                                    placeholder=" "
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                                <label className="floating-label-text-Signup">Phone Number</label>
                            </div>

                            <div className="date-gender-container">
                                <div className="date-gender-container">
                                    {/* Date Of Birth */}
                                    <div className="floating-label-Signup">
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            className="floating-input-Signup"
                                            placeholder=" "
                                            required
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                        />
                                        <label className="floating-label-text-Signup">Date of Birth</label>
                                    </div>

                                    {/* Gender */}
                                    <div className="floating-label-Signup">
                                        <select
                                            name="gender"
                                            className="floating-input-Signup"
                                            required
                                            value={formData.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled selected>Gender</option>
                                            <option value="Man">Man</option>
                                            <option value="Woman">Woman</option>
                                        </select>
                                        <label className="floating-label-text-Signup">Gender</label>
                                    </div>
                                </div>

                            </div>


                            {/* Educational Level */}
                            <div className="floating-label-Signup">
                                <input
                                    type="text"
                                    name="educationalLevel"
                                    className="floating-input-Signup"
                                    placeholder=" "
                                    value={formData.educationalLevel}
                                    onChange={handleChange}
                                />
                                <label className="floating-label-text-Signup">Educational Level</label>
                            </div>

                            {/* University */}
                            <div className="floating-label-Signup">
                                <input
                                    type="text"
                                    name="university"
                                    className="floating-input-Signup"
                                    placeholder=" "
                                    value={formData.university}
                                    onChange={handleChange}
                                />
                                <label className="floating-label-text-Signup">University</label>
                            </div>

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