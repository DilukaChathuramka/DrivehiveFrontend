import axios from "axios";
import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
function Repair() {
  const [vehicle, setVehicle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleDelete = async (id) => {
    try {
      await axios.patch(`/vehicle/deletevehicle/${id}`);
      const response = await axios.get("/vehicle/allvehicle");
      setVehicle(response.data);
    } catch (err) {
      console.error(err);
    }
  };
// console.log(totalPrice)
  const downloadExcel = () => {
    const vehicles = vehicle; // Assume `payment` is your state variable holding the payment details
    const worksheet = XLSX.utils.json_to_sheet(vehicles);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");

    // Define a date for file naming
    let date = new Date().toISOString().slice(0, 10);

    // Trigger the download
    XLSX.writeFile(workbook, `Maintance_Details_${date}.xlsx`);
  };
  // const handleSearchInputChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };

  // const filtereVehicle = vehicle.filter((vehicle) =>
  //   vehicle.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   vehicle.vehicleNo.toLowerCase().includes(searchQuery.toLowerCase())

  // );

  const hadleEdit = async (id) => {
    navigate(`/vehicle-edit/${id}`);
  };

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
  return (
    <div>
      {/* <div className="search-container col-5 mb-4">
        <input
          type="text"
          placeholder="Search by Vehicle name, or Vehicle number"
          style={{border:'3px solid',borderRadius:'15px',fontSize:'20px'}}
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div> */}
      <button onClick={downloadExcel} className="btn btn-success mb-3">
        Download Excel Report
      </button>
      <div>
        <h3 className="text-right mb-4">Total expenses Rs : {totalPrice}.00</h3>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Vehicle Name</th>
            <th scope="col">vehicleNo</th>
            <th scope="col">Description</th>
            <th scope="col">Cost (Rs:)</th>
          </tr>
        </thead>
        <tbody>
          {vehicle.map((vehicle, index) => (
            <tr key={vehicle._id}>
              <th scope="row">{index + 1}</th>
              <td>{vehicle.vehicleID.vehicleName}</td>
              <td>{vehicle.vehicleID.vehicleNo}</td>
              <td>{vehicle.description}</td>
              <td>{vehicle.price}.00</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Repair;
