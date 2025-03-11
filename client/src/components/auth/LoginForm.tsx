import { useState } from "react";
import { Button, TextField, Grid, Container, Typography } from "@mui/material";
import "../../styles/LoginForm.scss";
import { loginUser } from "../../services/authService";
import { showErrorToast, showSuccessToast } from "../utils/Toast";
import { useSetRecoilState } from "recoil";
import { isLoggedInState } from "../../state/atoms";
import { userAccessLevelState } from "../../state/atoms";
import { useNavigate } from "react-router-dom";
import ForgotPasswordDialog from "../dialogs/ForgotPasswordDialog";
import { jwtDecode } from "jwt-decode";
import { AccessLevel } from "../../constants/accessLevelEnum";
import { ROUTES, TOAST_MESSAGES_LOGIN } from "../../constants";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setUserAccessLevelState = useSetRecoilState(userAccessLevelState);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { token } = await loginUser(username, password);
      setIsLoggedIn(true);
      const decodedToken = jwtDecode<{ accessLevel: number }>(token);
      const accessLevel = decodedToken.accessLevel;
      setUserAccessLevelState(accessLevel);
      if (accessLevel === AccessLevel.ADMIN) {
        navigate(ROUTES.ADMIN);
      } else {
        navigate(ROUTES.HOME);
      }
      showSuccessToast(TOAST_MESSAGES_LOGIN.LOGIN_SUCCESS);
    } catch (error) {
      console.error(`Login failed: ${(error as Error).message}`);
      showErrorToast(TOAST_MESSAGES_LOGIN.LOGIN_FAILURE);
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
