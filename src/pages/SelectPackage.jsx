import React from "react";
import { Link } from "react-router-dom";

function SelectPackage() {
  return (
    <div className="container">
      <div>
        <h2 className="text-center mt-4">Select Your Vehicle</h2>
      </div>
      
      <div className="outer-box d-flex justify-content-around align-items-center">
        <Link to={"/packages/car"} style={{ textDecoration: "none" }}>
          <div className="innter-box d-flex align-items-center justify-content-center">
            <h4>Car Package</h4>
          </div>
        </Link>
        <Link to={"/packages/van"} style={{ textDecoration: "none" }}>
          <div className="innter-box d-flex align-items-center justify-content-center">
            <h4>Van Package</h4>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SelectPackage;
