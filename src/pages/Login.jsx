import axios from "axios";
import React, { useContext, useState } from "react";
import { FaEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  //  const { addToWishlist } = useContext(WishlistContext);
  const { updateUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [data, SetData] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const userLogin = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post("/user/login", { email, password });
      updateUser(response.data.newUser);
      await axios.post("/emp/userlog", {
        userId: response.data.newUser._id,
      }); // Update user state on successful login
      navigate(
        response.data.newUser.role === "admin" ||
          response.data.newUser.role === "employee"
          ? "/dashboard"
          : "/"
      );
    } catch (err) {
      setErrMsg(err.response ? err.response.data.message : "Login failed");
    }
  };
  // console.log(user);
  return (
    <div className="container pt-4 pb-5">
      <div className="row">
        <div className="col-lg-6 col-md-12 d-flex justify-content-center ">
          <img
            src="../../public/images/hero-banner.jpg"
            className="img-fluid rounded"
            alt="Descriptive Alt Text"
          />
        </div>
        <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center ">
          <div className="m-3">
            <h2
              style={{
                fontWeight: 500,
                fontSize: "36px",
                fontFamily: "Poppins",
              }}
            >
              Log in to Exclusive
            </h2>
            <h4
              style={{
                fontWeight: 400,
                fontSize: "16px",
                fontFamily: "Poppins",
              }}
            >
              Enter your details below
            </h4>
            {errMsg ? <p className="alert alert-danger">{errMsg}</p> : null}
            <form method="POST" onSubmit={userLogin}>
              <div class="form-group pt-3">
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #000",
                    outline: "none",
                    borderRadius: "0",
                  }}
                  onChange={(e) => SetData({ ...data, email: e.target.value })}
                />
              </div>

              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #000",
                    outline: "none",
                    borderRadius: "0",
                    paddingRight: "30px", // Make room for the icon
                  }}
                  onChange={(e) =>
                    SetData({ ...data, password: e.target.value })
                  }
                />
                {showPassword ? (
                  <FaRegEye
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "10px", // Adjust as needed
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <FaEyeSlash
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "10px", // Adjust as needed
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  />
                )}
              </div>

              <button
                style={{
                  width: "143px",
                  height: "56px",
                  borderRadius: "4px",
                  border: "0px",
                  padding: "16px 48px 16px 48px",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  backgroundColor: "#DB4444", // Adjust background color as needed
                  color: "#FAFAFA", // Adjust text color as needed
                  cursor: "pointer",
                }}
                className="mb-2 mt-2"
              >
                <span>Log In</span>
              </button>
              <Link to="/forgot">
                <button
                  style={{
                    width: "228px",
                    height: "56px",
                    borderRadius: "4px",
                    border: "0px",
                    gap: "10px",
                    backgroundColor: "#ffffff", // Adjust background color as needed
                    color: "#DB4444", // Adjust text color as needed
                    cursor: "pointer",
                  }}
                  className="mb-2 mt-2"
                >
                  <span>Forget Password?</span>
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
