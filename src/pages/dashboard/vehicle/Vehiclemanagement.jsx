import axios from "axios";
import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
function Vehiclemanagement() {
  const [vehicle, setVehicle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/vehicle/allvehicle");
        setVehicle(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.patch(`/vehicle/deletevehicle/${id}`);
      const response = await axios.get("/vehicle/allvehicle");
      setVehicle(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filtereVehicle = vehicle.filter((vehicle) =>
    vehicle.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.vehicleNo.toLowerCase().includes(searchQuery.toLowerCase()) 
   
  );

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
        <div className="search-container col-5 mb-4">
        <input
          type="text"
          placeholder="Search by Vehicle name, or Vehicle number"
          style={{border:'3px solid',borderRadius:'15px',fontSize:'20px'}}
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Vehicle Name</th>
            <th scope="col">vehicleNo</th>
            <th scope="col">initialKM</th>
            <th scope="col">Condition</th>
            <th scope="col">vehicletype</th>
            <th scope="col">seatCapacity</th>
            <th scope="col">Action</th>

          </tr>
        </thead>
        <tbody>
          {filtereVehicle
            .filter((vehicle) => vehicle.isActive)
            .map((vehicle, index) => (
              <tr key={vehicle._id}>
                <th scope="row">{index + 1}</th>
                <td>{vehicle.vehicleName}</td>
                <td>{vehicle.vehicleNo}</td>
                <td>{vehicle.initialKM}</td>
                <td>{vehicle.condition}</td>
                <td>{vehicle.vehicletype}</td>
                <td>{vehicle.seatCapacity}</td>

                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => hadleEdit(vehicle._id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleDelete(vehicle._id)}
                    style={{ backgroundColor: "red",color:'black' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Vehiclemanagement;
