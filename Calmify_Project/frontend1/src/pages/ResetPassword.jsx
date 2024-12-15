import React, {useState} from "react";
import "../styles/ResetPassword.css";
// Import Material UI Icons (or use any other icon library)
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    return (
        <div className="background">
            <div className="card">
                <h1 className="heading">Reset your password</h1>
                <p className="subheading">
                    You&#39;re almost there! Let&#39;s secure your account with a new password.
                </p>
                <form className="form">
                    {/* New Password Input */}
                    <div className="floating-label">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="new-password"
                            name="new-password"
                            className="floating-input"
                            placeholder=" "
                        />
                        <label htmlFor="new-password" className="floating-label-text">
                            Enter a new secure password
                        </label>
                        <span
                            className="password-toggle"
                            onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                              <Visibility className="password-icon"/>
                          ) : (
                              <VisibilityOff className="password-icon"/>
                          )}
            </span>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="floating-label">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirm-password"
                            name="confirm-password"
                            className="floating-input"
                            placeholder=" "
                        />
                        <label htmlFor="confirm-password" className="floating-label-text">
                            Re-enter your password to confirm
                        </label>
                        <span
                            className="password-toggle"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                        {showConfirmPassword ? (
                            <Visibility className="password-icon"/>
                        ) : (
                           <VisibilityOff className="password-icon"/>
                        )}
            </span>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button">
                Reset your password
            </button>
        </form>
</div>
</div>
)
    ;
}
