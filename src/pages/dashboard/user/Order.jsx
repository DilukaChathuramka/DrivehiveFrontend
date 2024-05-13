import axios from "axios";
import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
function Order() {
  const [order, setPayment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get("/payment/gellAll");
        setPayment(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, []);
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = order.filter(
    (order) =>
      order.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // order.packageType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user.phoneNo.toString().includes(searchQuery)
  );
  const downloadExcel = () => {
    const payments = order; // Assume `order` is your state variable holding the order details
    const worksheet = XLSX.utils.json_to_sheet(payments);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "order");

    // Define a date for file naming
    let date = new Date().toISOString().slice(0, 10);

    // Trigger the download
    XLSX.writeFile(workbook, `order_details${date}.xlsx`);
  };



  //   const downloadExcel = () => {
  //     const payments = order; // Assume `order` is your state variable holding the order details
  //     const worksheet = XLSX.utils.json_to_sheet(payments);
  //     const workbook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");

  //     // Define a date for file naming
  //     let date = new Date().toISOString().slice(0,10);

  //     // Trigger the download
  //     XLSX.writeFile(workbook, `Payment_Details_${date}.xlsx`);
  // };

  if (isLoading) {
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // console.log(order);
  return (
    <div>
      <h1 className="text-center">Order History</h1>
      <button onClick={downloadExcel} className="btn btn-success mb-3">
        Download Excel Report
      </button>
      <div className="search-container col-5 mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone number"
          style={{
            border: "3px solid",
            borderRadius: "15px",
            fontSize: "20px",
          }}
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone no</th>
            <th scope="col">Pack Type</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>


            {/* <th scope="col">Action</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((order, index) => (
            <tr key={order._id}>
              <th scope="row">{index + 1}</th>
              <td>{order.user && order.user.name}</td>
              <td>{order.user && order.user.email}</td>
              <td>{order.user && order.user.phoneNo}</td>
              <td>{order && order.packageType}</td>
              <td>{order && new Date(order.date).toLocaleDateString()}</td>
              <td>{order && new Date(order.date).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Order;
