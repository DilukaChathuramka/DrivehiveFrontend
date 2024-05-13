import axios from "axios";
import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { useParams } from "react-router-dom";

function ResetPass() {
  const [errMsg, setErrMsg] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const { token } = useParams();
  console.log(token)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("/user/resetPass", {
        token,
        password,
      });
    //   console.log(response)
    setMessage(response.data.message);
    } catch (error) {
        setErrMsg(error.data.message);
    }
  };
  return (
    <div className="col-lg-12 col-md-12 d-flex align-items-center justify-content-center ">
      <div className="m-3">
        <h4
          style={{
            fontWeight: 400,
            fontSize: "16px",
            fontFamily: "Poppins",
          }}
        >
          Enter your Password
        </h4>
        {message ? (
              <p className="alert alert-success">{message}</p>
            ) : errMsg ? (
              <p className="alert alert-danger">{errMsg}</p>
            ) : null}
        <form method="POST" onSubmit={handleSubmit}>
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
              onChange={(e) => setPassword(e.target.value)}
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
            <span>Submit</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPass;
