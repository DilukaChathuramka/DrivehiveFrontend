import React, { useEffect, useState } from "react";
import "./driver.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
function DriverRegistration() {
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

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
    phoneNo: "",
    license: "",
    address: "",
  });

  if (id) {
    useEffect(() => {
      const fetchdriver = async () => {
        try {
          const response = await axios.get(`/driver/getDriver/${id}`);
          SetData(response.data);
          setIsLoading(true);
        } catch (err) {
          setErrMsg(err);
          setIsLoading(false);
        }
      };
      fetchdriver();
    }, []);
  }

  const driverRegistration = async (e) => {
    e.preventDefault();

    const { name, email, phoneNo, license, address } = data;

    if (isValidEmail || isValidPhone) {
      if (id) {
        try {
          const response = await axios.patch(`/driver/editDriver/${id}`, {
            name,
            email,
            phoneNo,
            license,
            address,
          });
          if (response.data.message) {
            setMessage(response.data.message);
            SetData({
              name: "",
              email: "",
              phoneNo: "",
              license:"",
              address:""
            });
          }
        } catch (error) {
          setErrMsg(error.message);
        }
      } else {
        try {
          const response = await axios.post("/driver/addDriver", {
            name,
            email,
            phoneNo,
            license,
            address,
          });
          if (response.data.message) {
            setMessage(response.data.message);
            SetData({
              name: "",
              email: "",
              phoneNo: "",
              license: "",
              address: "",
            });
          }
        } catch (error) {
          setErrMsg(error.message);
        }
      }
    } else {
      setErrMsg("Valid email or phone number required");
    }
  };

  if (!isLoading) {
    return (
      <div className="center-spinner">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          visible={true}
        />
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-10">
          <h1 className="h3 mb-0 text-gray-800 mb-3">ADD Driver</h1>
          {message ? (
            <p className="alert alert-success">{message}</p>
          ) : errMsg ? (
            <p className="alert alert-danger">{errMsg}</p>
          ) : null}
          <form class="row g-3 " method="POST" onSubmit={driverRegistration}>
            <div class="col-md-6">
              <label for="inputEmail4" class="form-label">
                Driver Name
              </label>
              <input
                type="text"
                class="form-control"
                id="inputEmail4"
                value={data.name}
                onChange={(e) => SetData({ ...data, name: e.target.value })}
              />
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">
                Phone No
              </label>
              <input
                type="text"
                class="form-control"
                id="phoneno"
                value={data.phoneNo}
                onChange={(e) => {
                  SetData({ ...data, phoneNo: e.target.value });
                  validatePhone(e.target.value);
                }}
              />
            </div>
            <div class="col-6">
              <label for="inputAddress" class="form-label">
                Email
              </label>
              <input
                type="email"
                class="form-control"
                id="inputAddress"
                value={data.email}
                onChange={(e) => {
                  SetData({ ...data, email: e.target.value });
                  validateEmail(e.target.value);
                }}
              />
            </div>
            <div class="col-6">
              <label for="inputAddress" class="form-label">
                License No
              </label>
              <input
                type="text"
                class="form-control"
                id="inputnn"
                value={data.license}
                onChange={(e) => {
                  SetData({ ...data, license: e.target.value });
                }}
              />
            </div>
            <div class="col-6">
              <label for="inputAddress" class="form-label">
                Address
              </label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                value={data.address}
                onChange={(e) => {
                  SetData({ ...data, address: e.target.value });
                }}
              />
            </div>

            <div class="col-12 d-flex justify-content-center">
              <button
                type="submit"
                class="btn btn-primary"
                style={{ width: "250px", height: "50px" }}
              >
                {" "}
                {id ? "Update" : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DriverRegistration;
