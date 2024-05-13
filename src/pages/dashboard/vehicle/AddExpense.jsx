import axios from "axios";
import React, { useEffect, useState } from "react";

function AddExpense() {
  const [vehicle, setVehicle] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const [price, setPrice] = useState("");
  const [priceError, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("/vehicle/allvehicle");
        setVehicle(response.data);
   
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        // Handle the error appropriately
      }
    };
    fetchVehicles();
  }, []);

  const validateInput = (inputValue, setInputValue, setError) => {
    if (/^\d*\.?\d*$/.test(inputValue)) {
      // Only allows numeric values
      setInputValue(inputValue);
      setError("");
    } else {
      setError("Please enter a valid number");
    }
  };

  const handlePrice = (e) => {
    const input = e.target.value;
    validateInput(input, setPrice, setError);
  };
 
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const add = await axios.post("/vehicle/expense", {
            vehicleID:selectedVehicle,
            description:description,
            price
           
        });
        if(add.data){
                setMsg(add.data.message) 
                setDescription("");
                setPrice("") 
        }
       
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div>
      <h2 className="text-center">Vehicle Expenses</h2>
      {msg ? <p className="text-center alert alert-success">{msg}</p> : null}
      <div className="row d-flex justify-content-center mt-3">
        <div className="col-5 mt-2">
          <label class="form-check-label mt-3" for="flexRadioDefault1">
            <h5>select Your Driver</h5>
          </label>
          <div className="col-10">
            <label class="form-check-label" for="flexRadioDefault1">
              <h5>select Car</h5>
            </label>
            <select
              className="form-select"
              aria-label="Vehicle select"
              onChange={(e) => setSelectedVehicle([e.target.value])}
            >
              {vehicle &&
                vehicle.map((vehicle) => (
                  <option key={vehicle._id} value={vehicle._id}>
                    {vehicle.vehicleName}-{vehicle.vehicletype}
                  </option>
                ))}
            </select>
          </div>
          <div className="checkout-input">
            <h5 className="mt-3">Desription</h5>
            <input
              type="text"
              className="form-control"
              id="inputEmail"
              value={description}
              onChange={(e) => setDescription(e.target.value)}

              // value={user && user.email}
            />
          </div>
          <div className="checkout-input">
            <h5 className="mt-3">Price</h5>
            <input
              type="text"
              className="form-control"
              id="inputPrice"
              value={price}
              onChange={handlePrice}
            />
            {priceError && <span style={{ color: "red" }}>{priceError}</span>}
          </div>
          <button className="btn btn-primary" onClick={handleSubmit}>Mark</button>
        </div>
      </div>
    </div>
  );
}

export default AddExpense;
