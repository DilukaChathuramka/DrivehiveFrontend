import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../context/UserContext";
function Payment() {
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [town, setTown] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [packageData, setPackageData] = useState("");
  const { user } = useUser();
console.log(packageData)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const packageId = queryParams.get("id");
  
  const customizeid = queryParams.get("customizeid");
  const packageType = queryParams.get("packageType");
  const price = queryParams.get("price");
  console.log(customizeid);
 
  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\s/g, ""); // Remove any existing whitespace
    let formattedInput = "";

    // Divide the input into groups of four digits
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedInput += " "; // Add a space every four digits
      }
      formattedInput += input[i];
    }

    setCardNumber(formattedInput);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/package/onegetpack/${packageId}`);
        setPackageData(response.data);
      } catch (error) {
        console.error('Error fetching package data:', error);
      }
    };

    if (packageId) {
      fetchData();
    }
  }, [packageId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const billDetails = [
      {
        name,
        address,
        apartment,
        town,
        phoneNo,
        email,
      },
    ];

    const cardDetails = [
      {
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv,
      },
    ];

    const confirmResult = await Swal.fire({
      title: "Confirm Payment",
      text: "Are you sure you want to proceed with the payment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "No, cancel",
    });
    if (confirmResult.isConfirmed) {
      try {
        const response = await axios.post("/payment/addpayment", {
          user: user._id,
          packageName: packageId,
          billDetails,
          cardDetails,
          packageType,
          customisePackage: customizeid,
          total: price,
        });

        if (response.data.message) {
          setName("");
          setAddress("");
          setApartment("");
          setTown("");
          setPhoneNo("");
          setEmail("");
          setCardNumber("");
          setExpiryMonth("");
          setExpiryYear("");
          setCvv("");
          setMessage(response.data.message);
        } // Handle the response as needed
      } catch (error) {
        if (error.response && error.response.data) {
          // Server-sent error message
          setErrMsg(error.response.data.message || "Failed to add package.");
        } else {
          // Generic or network error
          setErrMsg("An unexpected error occurred.");
        }
      }
    }
  };

  return (
    <div className="container">
      <div className=" row d-flex pt-5 ">
        <div className=" d-flex justify-content-between  ">
          <div className="d-flex">
            <h6 style={{ opacity: "50%" }}>PAYMENT</h6>
          </div>
        </div>
      </div>

      <div className="row pt-5">
        <div className="col-lg-6 col-md-12">
          <h2>Billing Details</h2>
          {message ? (
            <p className="alert alert-success">{message}</p>
          ) : errMsg ? (
            <p className="alert alert-danger">{errMsg}</p>
          ) : null}
          <div className="pt-3 pb-3">
            <div className="checkout-input">
              <h5 style={{ opacity: "50%" }}>
                Name<span style={{ color: "red" }}>*</span>
              </h5>
              <input
                type="first"
                class="form-control"
                id="inputFirst"
                value={user.name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "470px", height: "50px" }}
              />
            </div>

            <div className="checkout-input">
              <h5 style={{ opacity: "50%" }}>
                Street Address<span style={{ color: "red" }}>*</span>
              </h5>
              <input
                type="Street"
                class="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                id="inputStreet"
                style={{ width: "470px", height: "50px" }}
              />
            </div>
            <div className="checkout-input">
              <h5 style={{ opacity: "50%" }}>
                Apartment, floor, etc. (optional)
              </h5>
              <input
                type="Apartment"
                class="form-control"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                id="inputApartment"
                style={{ width: "470px", height: "50px" }}
              />
            </div>
            <div className="checkout-input">
              <h5 style={{ opacity: "50%" }}>
                Town/City<span style={{ color: "red" }}>*</span>
              </h5>
              <input
                type="Town"
                class="form-control"
                id="inputTown"
                value={town}
                onChange={(e) => setTown(e.target.value)}
                style={{ width: "470px", height: "50px" }}
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
                value={user.phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                style={{ width: "470px", height: "50px" }}
              />
            </div>
            <div className="checkout-input">
              <h5 style={{ opacity: "50%" }}>
                Email Address<span style={{ color: "red" }}>*</span>
              </h5>
              <input
                type="Email"
                value={user.email}
                onChange={(e) => setEmail(e.target.value)}
                class="form-control"
                id="inputEmail"
                style={{ width: "470px", height: "50px" }}
              />
            </div>
          
          </div>
        </div>

        <div className="col-lg-6 col-md-12 padding-style">
          <div>
            <div className="process-box-row">
              <h3>Total: Rs {price}</h3>
            </div>
            <hr />

            <div class="form-check pt-3">
              <label class="form-check-label" for="flexRadioDefault2">
                <h5>Bank</h5>
              </label>
            </div>
            <div>
      <h2 className="mt-4 mb-3">Pack Details</h2>
      {packageData && (
        <div>
          <p>Package Name: {packageData.packagename}</p>
          <p>Vehicle Type: {packageData.vehicleType}</p>
          <p>Person Count: {packageData.Personcount}</p>
          <p>Distance: {packageData.distance}</p>
          <p>Duration: {packageData.duration}</p>
          <p>Condition: {packageData.condition}</p>
          <p>Price: {packageData.price}</p>

        </div>
      )}
    </div>
            <div>
              <h2 class="mt-4">Payment Details</h2>
              <form>
                <div class="form-group">
                  <label for="cardNumber">Card Number</label>
                  <input
                    type="text"
                    class="form-control"
                    id="cardNumber"
                    value={cardNumber}
                    placeholder="1234 1234 1234 1234"
                    maxLength="19" // Adjusted for spaces
                    onChange={handleCardNumberChange}
                  />
                </div>

                <div class="form-row">
                  <div class="col">
                    <label for="expiryMonth">Expiry Month</label>
                    <input
                      type="text"
                      class="form-control"
                      id="expiryMonth"
                      value={expiryMonth}
                      placeholder="MM"
                      maxlength="2"
                      onChange={(e) => setExpiryMonth(e.target.value)}
                    />
                  </div>
                  <div class="col">
                    <label for="expiryYear">Expiry Year</label>
                    <input
                      type="text"
                      class="form-control"
                      id="expiryYear"
                      value={expiryYear}
                      placeholder="YY"
                      maxlength="2"
                      onChange={(e) => setExpiryYear(e.target.value)}
                    />
                  </div>
                </div>

                <div class="form-group mt-3">
                  <label for="cvv">CVV</label>
                  <input
                    type="text"
                    class="form-control"
                    id="cvv"
                    value={cvv}
                    placeholder="123"
                    maxlength="3"
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </form>
            </div>

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

export default Payment;
