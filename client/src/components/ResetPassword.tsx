// src/components/ResetPassword.tsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/passwordResetService";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  // Get token from URL query string
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token"); // Get the token from the URL

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or expired link.");
    }
  }, [token]);

  const handlePasswordReset = async () => {
    if (!newPassword || !token) {
      setMessage("Please enter a new password.");
      return;
    }

    try {
      await resetPassword(token, newPassword);
      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error(`Failed to reset password ${(error as Error).message}`);
      setMessage("Failed to reset password. Please try again.");
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      {message && <p>{message}</p>}
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handlePasswordReset}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
