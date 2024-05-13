import React, { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";
import axios from "axios";

function Signin() {
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setConfirmPassword] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPassword(!showconfirmPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (emailRegex.test(email)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };
  
  const validatePhone = (phoneNo) => {
    const phoneRegex = /^[0-9]{10}$/; // Adjust regex based on your phone number format
    if (phoneRegex.test(phoneNo)) {
      setIsValidPhone(true);
    } else {
      setIsValidPhone(false);
    }
  };

  const [data, SetData] = useState({
    name: "",
    email: "",
    phoneNo:"",
    password: "",
  });

  const userRegistration = async (e) => {
    e.preventDefault();

    const { name, email, phoneNo,password } = data;
    // console.log(username);
    if (data.password !== confirmPass) {
      // Handle the mismatch case
      setErrMsg("Password Not Match");
      return;
    }

    if (isValidEmail && isValidPhone) {
      try {
        const response = await axios.post("/user/register", {
          name,
          email,
          phoneNo,
          password,
        });
        if (response.data.message ) {
          SetData({
            name: "",
            email: "",
            phoneNo: "",
            password: "",
          });
          setConfirmPass(""); 
          setMessage(response.data.message);

        }
      } catch (error) {
        if (error.response && error.response.data) {
          const message = error.response.data.message;
          if (message === "2") {
            setErrMsg("Password must contain at least 8 characters");
          } else{

            setErrMsg(message);
          }
          
        } else {
          // Handle the case where error.response is undefined
          setErrMsg("An unexpected error occurred");
        }
      }
    } else {
      setErrMsg("Valid email or phone number required");
    }
  };

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
        {}
          <div className="m-3">
            {message ? (
              <p className="alert alert-success">{message}</p>
            ) : errMsg ? (
              <p className="alert alert-danger">{errMsg}</p>
            ) : null}
            <h2
              style={{
                fontWeight: 500,
                fontSize: "36px",
                fontFamily: "Poppins",
              }}
            >
              Create an account
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

            <form method="POST"  onSubmit={userRegistration}>
              <div class="form-group pt-3">
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail"
                  required
                  aria-describedby="emailHelp"
                  placeholder="Name"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #000",
                    outline: "none",
                    borderRadius: "0",
                  }}
                  onChange={(e) => SetData({ ...data, name: e.target.value })}
                  value={data.name}
                />
              </div>
              <div class="form-group pt-3">
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail"
                  required
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #000",
                    outline: "none",
                    borderRadius: "0",
                  }}
                  onChange={(e) => {
                    SetData({ ...data, email: e.target.value });
                    validateEmail(e.target.value);
                  }}
                  value={data.email}
                />
              </div>
              <div class="form-group pt-3">
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Phone No"
                  required
                  style={{
                    border: "none",
                    borderBottom: "1px solid #000",
                    outline: "none",
                    borderRadius: "0",
                  }}
                  onChange={(e) => {
                    SetData({ ...data, phoneNo: e.target.value });
                    validatePhone(e.target.value);
                  }} 
                  value={data.phoneNo}
                />
              </div>

              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="inputPassword"
                  required
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
                  value={data.password}
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
              <div
                className="form-group pt-3 pb-3"
                style={{ position: "relative" }}
              >
                <input
                  type={showconfirmPassword ? "text" : "password"}
                  className="form-control"
                  id="inputPassword"
                  required
                  placeholder="Confirm password"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #000",
                    outline: "none",
                    borderRadius: "0",
                    paddingRight: "30px", // Make room for the icon
                  }}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  value={confirmPass}
                />
                {showconfirmPassword ? (
                  <FaRegEye
                    onClick={toggleConfirmPasswordVisibility}
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
                    onClick={toggleConfirmPasswordVisibility}
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
                  width: "150px",
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
                <span>sign In</span>
              </button>
              <p class=" text-muted mt-3 mb-0">
                Have already an account?{" "}
                <a href="/login" class="fw-bold text-body">
                  <u>Login here</u>
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
