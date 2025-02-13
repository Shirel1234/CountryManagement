import { useState } from "react";
import { Button, TextField, Grid, Container, Typography } from "@mui/material";
import "../styles/LoginForm.scss";
import { loginUser } from "../services/authService";
import { showErrorToast, showSuccessToast } from "./Toast";
import { useSetRecoilState } from "recoil";
import { isLoggedInState } from "../state/atoms";
import { useNavigate } from "react-router-dom";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { token } = await loginUser(username, password);
      console.log("Login successful. Token:", token);
      setIsLoggedIn(true);
      navigate("/home");
      showSuccessToast("Login successful! Welcome back!");
    } catch (error) {
      console.error(`Login failed: ${(error as Error).message}`);
      showErrorToast("Failed to log in. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="login-form">
        <Typography variant="h5" align="center" className="form-title">
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} className="submit-btn">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Log In
              </Button>
            </Grid>
            <Grid item xs={12} className="forgot-password">
              <Button
                color="primary"
                onClick={() => setForgotPasswordOpen(true)}
              >
                Forgot Password?
              </Button>
            </Grid>
          </Grid>
        </form>
        <ForgotPasswordDialog
          open={forgotPasswordOpen}
          onClose={() => setForgotPasswordOpen(false)}
        />
      </div>
    </Container>
  );
};

export default LoginForm;
