import React from "react";
import { Typography, Container, Box } from "@mui/material";
import "../../styles/LandingPage.scss";

const LandingPage: React.FC = () => {
  return (
    <Container maxWidth="md" className="landing-container">
      <Box className="landing-content">
        <Typography variant="h2" className="landing-title">
          Welcome to the Country Explorer
        </Typography>
        <Typography variant="body1" className="landing-description">
          Explore, learn, and manage your favorite countries with ease. Get started by exploring the countries around the world!
        </Typography>
      </Box>
    </Container>
  );
};

export default LandingPage;
