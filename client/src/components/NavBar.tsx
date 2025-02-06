import React from "react";
import { useRecoilValue } from "recoil";
import { selectedCountryState } from "../state/atoms";
import "../styles/NavBar.scss";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const selectedCountry = useRecoilValue(selectedCountryState);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">Country Manager</h1>
        {selectedCountry && (
          <span className="navbar-status">
            <p>{selectedCountry.name}</p>
          </span>
        )}
        <div className="navbar-buttons">
        <Link to="/login">
            <button className="sign-btn">Login</button>
          </Link>
          <Link to="/sign-up">
            <button className="sign-btn">Sign In</button>
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
