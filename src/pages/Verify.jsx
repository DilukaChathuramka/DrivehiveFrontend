import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Verify() {
  const [verificationStatus, setVerificationStatus] = useState({
    verified: false,
    message: "",
  });

  const param = useParams();
  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `/user/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setVerificationStatus({
          verified: true,
          message: "Email successfully verified.",
        });
      } catch (error) {
        console.error(error);
        setVerificationStatus({
          verified: false,
          message: "Invalid or expired token.",
        });
      }
    };
    verifyEmailUrl();
  }, [param]);
  return (
    <div className="container pt-4 pb-5 ">
      <div className="row">
        <div className="col-lg-6 col-md-12 d-flex justify-content-center">
          <img
            src="../../public/images/hero-banner.jpg"
            style={{ hight: "400px", width: "600px", fontFamily: "Poppins" }}
            className="img-fluid"
          />
        </div>
        <div className="col-lg-6 col-md-12 d-flex justify-content-center">
          <div className="container m-5" style={{ width: "400px" }}>
            {verificationStatus.verified ? (
              <>
                <h2
                  style={{
                    fontWeight: 500,
                    fontSize: "36px",
                    fontFamily: "Poppins",
                  }}
                >
                  Verify Success
                </h2>
                <form method="POST">
                  <Link to={"/login"} style={{textDecoration:'none'}}>
                  <button
                      style={{
                        width: "371px",
                        height: "56px",
                        borderRadius: "4px",
                        border: "0px",
                        padding: "16px 86px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        backgroundColor: "#DB4444", // Adjust background color as needed
                        color: "#FAFAFA", // Adjust text color as needed
                        cursor: "pointer",
                      }}
                    className="mb-2 mt-2"
                  >
                    Login Now
                  </button>
                  </Link>
                </form>
              </>
            ) : (
              <>
                <h2
                  style={{
                    fontWeight: 500,
                    fontSize: "36px",
                    fontFamily: "Poppins",
                  }}
                >
                  Verification Failed
                </h2>
              
                <Link to={"/signin"} style={{textDecoration:'none'}}>
                  <button
                      style={{
                        width: "371px",
                        height: "56px",
                        borderRadius: "4px",
                        border: "0px",
                        padding: "16px 86px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        backgroundColor: "#DB4444", // Adjust background color as needed
                        color: "#FAFAFA", // Adjust text color as needed
                        cursor: "pointer",
                      }}
                    className="mb-2 mt-2"
                  >
                    Try Again
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verify;