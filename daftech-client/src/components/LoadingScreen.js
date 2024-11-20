import React from "react";
import "../components/style.css";

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
