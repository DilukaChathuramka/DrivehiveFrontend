import React, { useEffect } from 'react'
import { useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
function Addemp() {
    const [message, setMessage] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPhone, setIsValidPhone] = useState(true);
    
   
  
    
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
      address:""
    });

    const { id } = useParams();

    if (id) {
     useEffect(() => {
        const fetchEmp = async () => {
          try {
            const response = await axios.get(`/emp/getemp/${id}`);
            SetData(response.data);
            setIsLoading(true);
          } catch (err) {
            setErrMsg(err);
            setIsLoading(false);
          }
        };
        fetchEmp();
     },[])
    }
  
    const empRegistration = async (e) => {
      e.preventDefault();
  
      const { name, email, phoneNo,address} = data;
  
      if (isValidEmail && isValidPhone) {
        if(id){
          try {
            const response = await axios.patch(`/user/edituser/${id}`, {
              name,
              email,
              phoneNo,
              address,
            });
          
            if (response.data) {
              setMessage("User details updated successfully");
              SetData({
                name: "",
                email: "",
                phoneNo: "",
                address:""
              });
            }
          } catch (error) {
            setErrMsg("Check your Input fields");
          }
        }
        else{

          try {
            const response = await axios.post("/emp/addemp", {
              name,
              email,
              phoneNo,
              address,
            });
           
            if (response.data) {
              setMessage("Employee details added successfully");
              SetData({
                name: "",
                email: "",
                phoneNo: "",
                address: "",
              });
            }
          } catch (error) {
            setErrMsg("Check your Input fields");
          }
        }
      } else {
        setErrMsg("Valid email or phone number required");
      }
    };

    if(!isLoading){ 
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
        <h1 className="h3 mb-0 text-gray-800 mb-3">Employee</h1>
        {message ? (
          <p className="alert alert-success">{message}</p>
        ) : errMsg ? (
          <p className="alert alert-danger">{errMsg}</p>
        ) : null}
        <form class="row g-3 " method="POST" onSubmit={empRegistration}>
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">
              Employee Name
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              value={data.name}
              required
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
              required
              onChange={(e) => {
                validatePhone(e.target.value);
                SetData({ ...data, phoneNo: e.target.value });
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
              required
              onChange={(e) => {
                SetData({ ...data, email: e.target.value });
                validateEmail(e.target.value);
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
              value={data.address}
              required
              id="inputAddress"
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
              {
                id ? "Update" : "Register"
              }
  
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Addemp