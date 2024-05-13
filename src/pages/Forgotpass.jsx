import axios from 'axios';
import React, { useState } from 'react'

function Forgotpass() {
  const [errMsg,setErrMsg]=useState('');
  const [email,setEmail]=useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("/user/forgotpass", {
        email
      });
      setErrMsg(response.data.message);
    } catch (error) {
        setErrMsg(error.response.data.message);
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
              Enter your details below
            </h4>
            {errMsg ? <p className="alert alert-danger">{errMsg}</p> : null}
            <form method="POST" >
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
                    width:'400px'
                  }}
                  onChange={(e)=>setEmail(e.target.value)}
                  // onChange={(e) => SetData({ ...data, email: e.target.value })}
                />
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

                onClick={handleSubmit}
              >
                <span>Verify</span>
              </button>
           
             
            </form>
          </div>
        </div>
  )
}

export default Forgotpass