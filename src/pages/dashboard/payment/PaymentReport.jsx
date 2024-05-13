import axios from "axios";
import React, { useEffect, useState } from "react";

function PaymentReport() {
  const [vehicle, setVehicle] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [payment, setPayment] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0); 
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get("/vehicle/allDetails");
        setVehicle(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, []);
  // Calculate total price when vehicle array changes
  useEffect(() => {
    if (vehicle && vehicle.length > 0) {
      const total = vehicle.reduce((acc, curr) => acc + curr.price, 0);
      setTotalPrice(total);
    }
  }, [vehicle]);

  useEffect(() => {
    const fetchpayment = async () => {
      try {
        const response = await axios.get("/payment/gellAll");
        setPayment(response.data);
        const totalSum = response.data.reduce((acc, item) => acc + parseInt(item.total, 10), 0);
        setTotalPayment(totalSum);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchpayment();
  }, []);

  return (
    <div className="">
      <div className="d-flex">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total Earning
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                   Rs {totalPayment} .00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Total Expense
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    RS: {totalPrice}.00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Balance
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                   Rs: {totalPayment-totalPrice} .00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentReport;
