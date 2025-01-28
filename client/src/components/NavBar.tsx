import React from "react";
import { useRecoilValue } from "recoil";
import { selectedCountryState } from "../state/atoms";
import "../styles/NavBar.scss";

const NavBar: React.FC = () => {
  const selectedCountry = useRecoilValue(selectedCountryState);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">Country Manager</h1>
        <span className="navbar-status">
          {selectedCountry ? (
            <p>{selectedCountry.name}</p>
          ) : (
            <p>No country in edit mode</p>
          )}
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
