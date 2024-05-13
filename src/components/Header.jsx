import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext"
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";

function Header() {
  const [isActive, setIsActive] = useState(false);
  const { user} = useUser();
  const toggleNav = () => {
    setIsActive(!isActive);
  };

  const logout = async () => {
    try {
      const logOut = await axios.get("/user/logout");
      if (logOut.data) {
        // console.log(logOut.data.message);
        window.location.href = "http://localhost:5173/";
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <header className="header" data-header>
      <div className="container">
        <div
          className={`overlay ${isActive ? "active" : ""}`}
          data-overlay
          onClick={toggleNav}
        ></div>
        <a href="/" className="logo">
          <h3>DRIVE HIVE</h3>
        </a>
        <nav className={`navbar ${isActive ? "active" : ""}`} data-navbar>
          <ul className="navbar-list">
            <li>
              <a href="/" className="navbar-link" onClick={toggleNav}>
                Home
              </a>
            </li>
            {/* <li><a href="#featured-car" className="navbar-link" onClick={toggleNav}>Explore cars</a></li> */}
            <li>
              <a href="#" className="navbar-link" onClick={toggleNav}>
                About us
              </a>
            </li>
            <li>
              <a href="/selectpackage" className="navbar-link" onClick={toggleNav}>
                Packages
              </a>
            </li>
            <li>
              <a
                href="/cutomizepackages"
                className="navbar-link"
                onClick={toggleNav}
              >
                Customize Package
              </a>
            </li>
            <li>
              <a href="/feedback" className="navbar-link" onClick={toggleNav}>
                Fedback
              </a>
            </li>

            <li>
              <a href="/signin" className="navbar-link" onClick={toggleNav}>
                Sign In
              </a>
            </li>
            <li>
              <a href="/login" className="navbar-link" onClick={toggleNav}>
                Login
              </a>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          {user && (
            <div className="d-flex align-items-center">
              <a href="#" className="btn user-btn" aria-label="Profile">
                <Link to={"/user-profile"}>
                  <FaRegUser/>
                </Link>
              </a>
              <a href="#" className="" aria-label="Profile">
                <IoIosLogOut onClick={logout}  className="mx-3"/>
              </a>
            </div>
          )}

          <button
            className={`nav-toggle-btn ${isActive ? "active" : ""}`}
            onClick={toggleNav}
            aria-label="Toggle Menu"
          >
            <span className="one"></span>
            <span className="two"></span>
            <span className="three"></span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
