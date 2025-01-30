import React from "react";
import "../styles/Loader.scss"

const Loader: React.FC = () => {
  return(
    <div data-testid="loader" className="loader">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
