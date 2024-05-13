import axios from "axios";
import React, { useEffect, useState } from "react";

function Attendance() {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("");
  const [msg, setMsg] = useState("");
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get("/driver/alldriver");
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
        // Handle the error appropriately
      }
    };
    fetchDrivers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addAttence = await axios.post("/driver/attendance", {
        driver:selectedDriver,
        date:attendanceDate,
      });
      if (addAttence.data.message) {
        setMsg(addAttence.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div >
      <h2 className="text-center">Driver Attendance</h2>
      {msg ? <p  className="text-center alert alert-success">{msg}</p> : null}
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-4">
          <label class="form-check-label mt-3" for="flexRadioDefault1">
            <h5>select Your Driver</h5>
          </label>
          <select
            className="form-select"
            aria-label="Vehicle select"
            onChange={(e) => setSelectedDriver(e.target.value)}
          >
            {drivers.map((driver) => (
              <option key={driver._id} value={driver._id}>
                {driver.name}
              </option>
            ))}
          </select>
          <div className="checkout-input">
            <h5 className="mt-3">Date</h5>
            <input
              type="date"
              className="form-control"
              id="inputEmail"
              onChange={(e) => setAttendanceDate(e.target.value)}

              // value={user && user.email}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Mark
          </button>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
