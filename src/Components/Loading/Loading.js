import React from "react";
import "./Loading.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
        <h2>Loading....</h2>
      <div className="loading-spinner"></div>
    </div>
  );
}