import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedInState, selectedCountryState } from "../state/atoms";
import { logoutUser } from "../services/authService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Avatar,
  Typography,
  Popover,
  List,
  ListItem,
} from "@mui/material";
import { AccountCircle, Logout } from "@mui/icons-material";
import "../styles/NavBar.scss";

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error("VITE_BASE_URL is not defined in the environment variables");
}

const NavBar: React.FC = () => {
  const [user, setUser] = useState<{
    myId: string;
    myUsername: string;
    myProfileImage: string;
  } | null>(null);
  const selectedCountry = useRecoilValue(selectedCountryState);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      localStorage.removeItem("userData");
      handleClosePopup();
      navigate("/");
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
              <div className="profile-info">
                {user?.myProfileImage ? (
                  <Avatar
                    src={`${BASE_URL}/uploads/${user.myProfileImage}`}
                    alt="User Profile"
                    className="profile-image"
                    sx={{ width: 50, height: 50, cursor: "pointer" }}
                    onClick={handleAvatarClick}
                  />
                ) : (
                  <Avatar
                    className="profile-image"
                    sx={{ width: 50, height: 50, cursor: "pointer" }}
                    onClick={handleAvatarClick}
                  />
                )}
                <Typography className="profile-username" variant="body1">
                  {user?.myUsername}
                </Typography>
              </div>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClosePopup}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <List className="popup-menu">
                  <ListItem
                    component={Link}
                    to={`/update-profile/${user?.myId}`}
                  >
                    <AccountCircle sx={{ marginRight: 1 }} />
                    <Typography variant="body2" className="popup-text">
                      Update Profile
                    </Typography>
                  </ListItem>
                  <ListItem onClick={handleLogout}>
                    <Logout sx={{ marginRight: 1 }} />
                    <Typography variant="body2" className="popup-text">
                      Logout
                    </Typography>
                  </ListItem>
                </List>
              </Popover>
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
