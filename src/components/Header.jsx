import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="d-flex ">
          <div className="nav nav-pills">
            <Link to="/" className="">
              Home
            </Link>
            <Link to="/about" className="">
              About
            </Link>
            <Link to="/users/1" className="">
              UserDetails
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
