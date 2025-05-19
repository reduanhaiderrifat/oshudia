import React from "react";
import "./loader.css";
const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
        <div className="text">Loading...</div>
      </div>
    </div>
  );
};

export default Loader;