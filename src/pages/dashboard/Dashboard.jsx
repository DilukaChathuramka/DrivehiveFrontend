import React, { useState } from "react";
import "./Dashboard.css";
import { FaCarSide } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { IoCarSportOutline } from "react-icons/io5";
import { LuPackage2 } from "react-icons/lu";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import axios from "axios";

function Dashboard({ children }) {
  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );

  const changeStyle = () => {
    if (
      style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };
  const changeStyle1 = () => {
    if (
      style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
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
    <div>
      <body id="page-top">
        {/*  <!-- Page Wrapper --> */}
        <div id="wrapper">
          {/*  <!-- Sidebar --> */}
          <ul className={style} id="accordionSidebar">
            {/*  <!-- Sidebar - Brand --> */}
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="#"
            >
              <div className="sidebar-brand-text mx-3">
                Drive Hive 
                <FaCarSide />
              </div>
              <div className="text-center d-none d-md-inline">
                <IoIosArrowForward
                  id="sidebarToggle"
                  onClick={changeStyle}
                  style={{ background: "none" }}
                />
              </div>
            </a>
            <li className="nav-item active">
              <a className="nav-link" href="/dashboard">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
            </li>
            {/*  <!-- Divider --> */}
            <hr className="sidebar-divider" />

            {/* user li */}
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapsePages"
                aria-expanded="true"
                aria-controls="collapsePages"
              >
                <CiUser className="mx-2" />
                <span>User</span>
              </a>
              <div
                id="collapsePages"
                className="collapse"
                aria-labelledby="headingPages"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="/user-details">
                    User Managment
                  </a>
                </div>
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="/order">
                    Order History
                  </a>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapseemp"
                aria-expanded="true"
                aria-controls="collapsePages"
              >
                <CiUser className="mx-2" />
                <span>Employee</span>
              </a>
              <div
                id="collapseemp"
                className="collapse"
                aria-labelledby="headingPages"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="/empManage">
                    Employee Managment
                  </a>
                  
                </div>
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="/employeeAdd">
                    Add employee
                  </a>
                  
                </div>
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="/log">
                   User Log
                  </a>
                  
                </div>
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="/salary">
                  Salary Management
                  </a>
                  
                </div>
                
              </div>
            </li>
            {/* diver li */}
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapsedriver"
                aria-expanded="true"
                aria-controls="collapsePages"
              >
                <CiUser className="mx-2" />
                <span>Driver</span>
              </a>
              <div
                id="collapsedriver"
                className="collapse"
                aria-labelledby="headingPages"
                data-parent="#accordionSidebar"
              ><div className="bg-white py-2 collapse-inner rounded">
              <a className="collapse-item" href="/alldriver">
                Driver Managment
              </a>
            </div>
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="/driver-registration">
                    Add driver
                  </a>
                </div>
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="/leave">
                    Leaves managment
                  </a>
                </div>
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="/attendance">
                  Driver Attendance
                  </a>
                </div>
              </div>
            </li>
            {/* vehical li */}
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapsevehicle"
                aria-expanded="true"
                aria-controls="collapsePages"
              >
                <IoCarSportOutline className="mx-2"/>
                <span>Vehicle</span>
              </a>
              <div
                id="collapsevehicle"
                className="collapse"
                aria-labelledby="headingPages"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="/vehicleAll">
                   Vehicle Management
                  </a>
                </div>
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="/vehicle-add">
                   Add vehile
                  </a>
                </div>
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="/expenses">
                   check vehile
                  </a>
                </div>
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="/repair">
                   Repair Details
                  </a>
                </div>

                
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapsepayement"
                aria-expanded="true"
                aria-controls="collapsePages"
              >
                <FaRegMoneyBillAlt className="mx-2"/>
                <span>payement</span>
              </a>
              <div
                id="collapsepayement"
                className="collapse"
                aria-labelledby="headingPages"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="/allpay">
                   All payment
                  </a>
                </div>
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="/payement-report">
                   Report
                  </a>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapsepackage"
                aria-expanded="true"
                aria-controls="collapsePages"
              >
                <LuPackage2 className="mx-2"/>
                <span>Packages</span>
              </a>
              <div
                id="collapsepackage"
                className="collapse"
                aria-labelledby="headingPages"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="/allPackage">
                   Package Managment
                  </a>
                </div>
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="/dashPackage">
                   Add package
                  </a>
                </div>
              
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapsecustompack"
                aria-expanded="true"
                aria-controls="collapsePages"
              >
                <FaRegMoneyBillAlt className="mx-2"/>
                <span>CustomPack</span>
              </a>
              <div
                id="collapsecustompack"
                className="collapse"
                aria-labelledby="headingPages"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="/allDetails">
                   All Custompackage
                  </a>
                </div>
              </div>
             
            </li>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapsefeedback"
                aria-expanded="true"
                aria-controls="collapsePages"
              >
                <IoCarSportOutline className="mx-2"/>
                <span>Feedback</span>
              </a>
              <div
                id="collapsefeedback"
                className="collapse"
                aria-labelledby="headingPages"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <a className="collapse-item" href="/getfeedback">
                   All Fedback
                  </a>
                </div>
              </div>
            </li>
          </ul>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button
                  id="sidebarToggleTop"
                  className="btn btn-link d-md-none rounded-circle mr-3"
                  onClick={changeStyle1}
                >
                  <i className="fa fa-bars"></i>
                </button>

                <ul className="navbar-nav ml-auto justify-content-end">
                  <li className="nav-item dropdown no-arrow login-user ">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="userDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                        Welcome Admin
                      </span>
                      <img
                        className="img-profile rounded-circle"
                        src="images/undraw_profile.svg"
                      />
                    </a>
                    {/*  <!-- Dropdown - User Information --> */}
                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="userDropdown"
                    >
                      <a
                        className="dropdown-item"
                        href="#"
                        data-toggle="modal"
                        data-target="#logoutModal"
                        onClick={logout}
                      >
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </nav>

              <div className="container-fluid">
                {/*  <!-- Page Heading --> */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                
                </div>

                {/*  <!-- Content Row --> */}
                <main>{children}</main>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Dashboard;
