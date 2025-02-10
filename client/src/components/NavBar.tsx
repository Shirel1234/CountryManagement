import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedInState, selectedCountryState } from "../state/atoms";
import { logoutUser } from "../services/authService";
import { useEffect, useState } from "react";
import { Button, Avatar, Typography } from "@mui/material";
import "../styles/NavBar.scss";

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error("VITE_BASE_URL is not defined in the environment variables");
}

const NavBar: React.FC = () => {
  const [user, setUser] = useState<{
    myUsername: string;
    myProfileImage: string;
  } | null>(null);
  const selectedCountry = useRecoilValue(selectedCountryState);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      localStorage.removeItem("userData");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
  }, [isLoggedIn]);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">Country Manager</h1>
        {selectedCountry && (
          <span className="navbar-status">
            <Typography variant="body1">{selectedCountry.name}</Typography>
          </span>
        )}
        <div className="navbar-buttons">
          {isLoggedIn ? (
            <div className="user-info">
              <Link to="/login">
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  color="primary"
                  sx={{ marginLeft: 2 }}
                >
                  Logout
                </Button>
              </Link>
              <div className="user-data">
                {user?.myProfileImage ? (
                  <Avatar
                    src={`${BASE_URL}/uploads/${user?.myProfileImage}`}
                    alt="User Profile"
                    className="profile-image"
                    sx={{
                      width: 50,
                      height: 50,
                      marginBottom: 1,
                    }}
                  />
                ) : (
                  <Avatar
                    className="profile-image"
                    sx={{ width: 50, height: 50 }}
                  />
                )}
                <Typography variant="body1" className="username">
                  {user?.myUsername}
                </Typography>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginLeft: 2 }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ marginLeft: 2 }}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
