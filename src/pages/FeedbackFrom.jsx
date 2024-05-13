import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
function FeedbackFrom() {
  const location = useLocation();
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const feedbackTo = queryParams.get("feedbackTo");
  const [feedbackoptionDriver, setfeedbackoptionDriver] = useState("");
  const [feedbackoptionCar, setfeedbackoptionCar] = useState("");

  const [feedbackmessage, setFeedbackmessage] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { user } = useUser();
  if(!user){  
    window.location.href = "/login";
  
  }
  useEffect(() => {
    const fetchVehicles = async () => {
        if(feedbackTo === "car") {
            try {
                const response = await axios.get("/vehicle/allvehicle");
                setVehicles(response.data);
                setMessage(response.data.message)
            } catch (error) {
                console.error("Error fetching vehicles:", error);
                setErrMsg(error.response.data.message);
                // Handle the error appropriately
            }
        }else{
            try {
                const response = await axios.get("/driver/alldriver");
                setDrivers(response.data);
            } catch (error) {
                console.error("Error fetching drivers:", error);
                // Handle the error appropriately
            }
        }
   
    };
    fetchVehicles();

  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const payload = {
      user: user._id,
      message: feedbackmessage
    };
    
    if (feedbackoptionDriver) {
      payload.driver = feedbackoptionDriver;
    }
    if (feedbackoptionCar) {
      payload.vehicle = feedbackoptionCar;
    }
   
    try {
      const response = await axios.post("/feedback/addfeedback",payload );
      setMessage(response.data.message);
      console.log("Feedback response:", response);
    } catch (error) {
        setErrMsg(error.response.data.message); 
      console.error("Error adding feedback:", error);
      // Handle the error appropriately
    }
  }

  return (
    <div class="container">
      <div class="row justify-content-lg-center">
        <div class="col-12 col-lg-9">
          <h2 className="text-center">Feedback Form</h2>
          {message ? (
            <p className="alert alert-success">{message}</p>
          ) : errMsg ? (
            <p className="alert alert-danger">{errMsg}</p>
          ) : null}
          <div class="bg-white border rounded shadow-sm overflow-hidden">
            <form action="#!">
                
              <div class="row gy-4 gy-xl-5 p-4 p-xl-5">
                <div class="col-12">
                  <label for="fullname" class="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="fullname"
                    name="fullname"
                    value={user && user.name}
                    readOnly
                  />
                </div>
                <div class="col-12 col-md-6">
                  <label for="email" class="form-label">
                    Email
                  </label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-envelope"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      name="email"
                      value={user && user.email}
                      readOnly

                    />
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <label for="phone" class="form-label">
                    Phone Number
                  </label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-telephone"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                      </svg>
                    </span>
                    <input
                      type="tel"
                      class="form-control"
                      id="phone"
                      name="phone"
                      value={user && user.phoneNo}
                      readOnly

                    />
                  </div>
                </div>
                {feedbackTo === "car" && (
                    <div class="col-12">
                        <label for="vehicle" class="form-label">
                        Vehicle
                        </label>
                        <select
                        class="form-select"
                        id="vehicle"
                        name="vehicle"
                        required
                        onChange={(e)=>setfeedbackoptionCar(e.target.value)}
                        >
                        <option value="">Select Vehicle</option>
                        {vehicles.map((vehicle) => (
                            <option value={vehicle._id}>{vehicle.vehicleName}</option>
                        ))}
                        </select>
                    </div>
                )}
                {feedbackTo === "driver" && (
                    <div class="col-12">
                        <label for="driver" class="form-label">
                        Driver
                        </label>
                        <select
                        class="form-select"
                        id="driver"
                        name="driver"
                        required
                        onChange={(e)=>setfeedbackoptionDriver(e.target.value)}
                        >
                        <option value="">Select Driver</option>
                        {drivers.map((driver) => (
                            <option value={driver._id} key={driver._id}>{driver.name}</option>
                        ))}
                        </select>
                    </div>
                
                )}
                <div class="col-12">
                  <label for="message" class="form-label">
                    Message
                  </label>
                  <textarea
                    class="form-control"
                    id="message"
                    name="message"
                    rows="3"
                    required
                    onChange={(e)=>setFeedbackmessage(e.target.value)}
                  ></textarea>
                </div>
                <div class="col-12">
                  <div class="d-grid">
                    <button class="btn btn-primary btn-lg" type="submit" onClick={handlesubmit}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackFrom;
