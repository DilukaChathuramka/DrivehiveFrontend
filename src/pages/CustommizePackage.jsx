import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function CustommizePackage() {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [distanceError, setDistanceError] = useState('');
  const [durationError, setDurationError] = useState('');
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const { user } = useUser();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("/vehicle/allvehicle");
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        // Handle the error appropriately
      }
    };

    const fetchDrivers = async () => {
      try {
        const response = await axios.get("/driver/alldriver");
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
        // Handle the error appropriately
      }
    };

    fetchVehicles();
    fetchDrivers();
  }, []);
  useEffect(() => {
    const newTotal = calculateTotal();
    setTotal(newTotal);
  }, [selectedOption, distance, vehicle, duration]);
  const calculateTotal = () => {
    if (selectedOption === "Non-AC" && distance && vehicle === "Car") {
      return Number(distance) * 100 + Number(duration) * 500;
    } else if (selectedOption === "AC" && distance && vehicle === "Car") {
      return Number(distance) * 100 + Number(duration) * 500 + 2000;
    } else if (selectedOption === "Non-AC" && distance && vehicle === "Van") {
      return Number(distance) * 150 + Number(duration) * 500;
    } else if (selectedOption === "AC" && distance && vehicle === "Van") {
      return Number(distance) * 150 + Number(duration) * 500 + 3000;
    }
    return 0; // Or any other default calculation for other cases
  };

  const goToNextStep = () => {
    setStep(step + 1);
  };

  const gotoBackStep = () => {
    setStep(step - 1);
  };

  const resetFields = () => {
    document.getElementById("inputFirst").value = "";
    document.getElementById("inputStreet").value = "";
    document.getElementById("inputPhone").value = "";
    document.getElementById("inputEmail").value = "";
  };

  const resetFieldstwo = () => {
    document.getElementById("duration").value = "";
    document.getElementById("distance").value = "";
    document.getElementById("flexRadioDefault1").checked = false;
    document.getElementById("flexRadioDefault2").checked = false;
  };

  const validateInput = (inputValue, setInputValue, setError) => {
    if (/^\d*\.?\d*$/.test(inputValue)) {
      // Only allows numeric values
      setInputValue(inputValue);
      setError("");
    } else {
      setError("Please enter a valid number");
    }
  };

  const handleDistanceChange = (e) => {
    const input = e.target.value;
    validateInput(input, setDistance, setDistanceError);
  };

  const handleDurationChange = (e) => {
    const input = e.target.value;
    validateInput(input, setDuration, setDurationError);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/customizepack/addcustompackage", {
        user: user._id,
        vehicleType: vehicle,
        vehicleCondition: selectedOption,
        distance,
        duration,
        vehicle: selectedVehicle,
        driver: selectedDriver,
      });
      if (response.data.message) {
        const customizeid = response.data.addcustom;

        // const queryParams = new URLSearchParams({customizeid,price:total}).toString();
        const queryParams = new URLSearchParams({
          customizeid,
          price: total,
          packageType: "customize",
        });

        navigate(`/payment?${queryParams}`);
      }
    } catch (error) {
      console.error("Error submitting custom package:", error);
      // Handle the error appropriately
    }
  };
  return (
    <div className="container">
      <div className=" row d-flex pt-5 ">
        <div className=" d-flex justify-content-between  "></div>
      </div>

      <div className="row pt-5">
        <div className="col-lg-6 col-md-12">
          <h2>Package Customize</h2>
          <div className="pt-3 pb-3">
            {step === 1 && (
              <div>
                <div className="checkout-input">
                  <h5 style={{ opacity: "50%" }}>
                    Name<span style={{ color: "red" }}>*</span>
                  </h5>
                  <input
                    type="first"
                    class="form-control"
                    id="inputFirst"
                    value={user && user.name}
                    style={{ width: "470px", height: "30px" }}
                    readOnly
                  />
                </div>

                <div className="checkout-input">
                  <h5 style={{ opacity: "50%" }}>
                    Phone Number<span style={{ color: "red" }}>*</span>
                  </h5>
                  <input
                    type="Phone"
                    class="form-control"
                    id="inputPhone"
                    style={{ width: "470px", height: "30px" }}
                    value={user && user.phoneNo}
                    readOnly
                  />
                </div>
                <div className="checkout-input">
                  <h5 style={{ opacity: "50%" }}>
                    Email Address<span style={{ color: "red" }}>*</span>
                  </h5>
                  <input
                    type="Email"
                    class="form-control"
                    id="inputEmail"
                    style={{ width: "470px", height: "30px" }}
                    value={user && user.email}
                    readOnly
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <div className="container">
                    {/* ...existing code... */}
                    <div className="d-flex justify-content-between">
                      <button
                        onClick={resetFields}
                        className="cart-style"
                        style={{ width: "100px", height: "35px" }}
                      >
                        Reset
                      </button>
                      <button
                        onClick={goToNextStep}
                        className="cart-style"
                        style={{ width: "100px", height: "35px" }}
                      >
                        Next
                      </button>
                    </div>
                    {/* ...existing code... */}
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div class="form-check pt-4 ">
                <div>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadiovehilce"
                    id="flexRadioDefault2"
                    value="Car"
                    onChange={(e) => setVehicle(e.target.value)}
                    checked={vehicle === "Car"}
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    <h5>Car</h5>
                  </label>
                </div>
                <div>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadiovehilce"
                    id="flexRadioDefault2"
                    value="Van"
                    onChange={(e) => setVehicle(e.target.value)}
                    checked={vehicle === "Van"}
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    <h5 className="mb-4">Van</h5>
                  </label>
                </div>
                <div>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadio"
                    id="flexRadioDefault1"
                    value="AC"
                    onChange={(e) => setSelectedOption(e.target.value)}
                    checked={selectedOption === "AC"}
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    <h5>AC</h5>
                    <span style={{ fontSize: "15px" }}>
                      {vehicle === "Car" ? (
                        <p>car charge rs: 2000</p>
                      ) : (
                        <p>van charge rs: 3000</p>
                      )}
                    </span>
                  </label>
                </div>
                <div>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadio"
                    id="flexRadioDefault1"
                    value="Non-AC"
                    onChange={(e) => setSelectedOption(e.target.value)}
                    checked={selectedOption === "Non-AC"}
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    <h5>Non-AC</h5>
                  </label>
                </div>
                <div>
                  <div className="checkout-input mt-4">
                    <h5 style={{ opacity: "50%" }}>
                      Distance (KM)
                      <span style={{ fontSize: "15px" }}>
                        {vehicle === "Car" ? (
                          <p>car charge rs: 100</p>
                        ) : (
                          <p>van charge rs: 150</p>
                        )}
                      </span>
                    </h5>
                    <input
                      type="text"
                      className="form-control"
                      id="distance"
                      style={{ width: "470px", height: "30px" }}
                      value={distance}
                      onChange={handleDistanceChange}
                    />
                    {distanceError && (
                      <span style={{ color: "red" }}>{distanceError}</span>
                    )}
                  </div>
                  <div className="checkout-input mt-4">
                    <h5 style={{ opacity: "50%" }}>
                      Duration (Days)
                      <span style={{ fontSize: "15px" }}>1Day=Rs 500</span>
                    </h5>
                    <input
                      type="text"
                      className="form-control"
                      id="duration"
                      style={{ width: "470px", height: "30px" }}
                      value={duration}
                      onChange={handleDurationChange}
                    />
                    {durationError && (
                      <span style={{ color: "red" }}>{durationError}</span>
                    )}
                  </div>
                </div>
                <div className="col-10">
                  <label class="form-check-label" for="flexRadioDefault1">
                    <h5>select Car</h5>
                  </label>
                  <select
                    className="form-select"
                    aria-label="Vehicle select"
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                  >
                    {vehicles.map((vehicle) => (
                      <option key={vehicle._id} value={vehicle._id}>
                        {vehicle.vehicleName}-{vehicle.vehicletype}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-10">
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
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button
                    onClick={resetFieldstwo}
                    className="cart-style"
                    style={{ width: "100px", height: "35px" }}
                  >
                    Reset
                  </button>
                  <button
                    className="cart-style"
                    onClick={gotoBackStep}
                    style={{ width: "100px", height: "35px" }}
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-6 col-md-12 padding-style">
          <div>
            <div className="process-box-row">
              <h6>total</h6>
              <h3>Rs {total}</h3>
            </div>

            <hr />

            <div class="form-check d-flex justify-content-between pt-4 "></div>
            <div className="d-flex justify-content-between"></div>
            <div>
              <button
                type="submit"
                class="cart-style mt-3 mb-3"
                onClick={handleSubmit}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustommizePackage;
