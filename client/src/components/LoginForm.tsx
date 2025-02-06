import { useState } from "react";
import { Button, TextField, Grid, Container, Typography } from "@mui/material";
// import axios from "axios";
import "../styles/LoginForm.scss"; // Import the SCSS file for styling

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <Container component="main" maxWidth="xs">
      <div className="login-form">
        <Typography variant="h5" align="center" className="form-title">
          Login
        </Typography>
        
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
            <Button variant="contained" color="primary" fullWidth type="submit">
              Log In
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default LoginForm;
