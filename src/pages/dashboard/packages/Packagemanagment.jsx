import axios from "axios";
import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
function Packagemanagment() {
    const [pack, setPack] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  
    useEffect(() => {
      const fetchpack = async () => {
        try {
          const response = await axios.get("/package/getpackage");
          setPack(response.data);
          setIsLoading(false);
        } catch (err) {
          setError(err);
          setIsLoading(false);
        }
      };
  
      fetchpack();
    }, []);

    const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const filteredUsers = pack.filter((packs) =>
      packs.vehicleType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      packs.packagename.toLowerCase().includes(searchQuery.toLowerCase()) 
    
    );
  
  
    const handleDelete = async (id) => {
      try {
        await axios.patch(`/package/deletePack/${id}`);
        const response = await axios.get("/package/getpackage");
        setPack(response.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    const hadleEdit = async (id) => {
      navigate(`/editpack/${id}`);
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
          placeholder="Search by VehicleType, package Name"
          style={{border:'3px solid',borderRadius:'15px',fontSize:'20px'}}
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">vehicleType</th>
          <th scope="col">packagename</th>
          <th scope="col">Person count </th>
          <th scope="col">distance</th>
          <th scope="col">duration</th>
          <th scope="col">price</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers
          .filter((packages) => packages.isActive)
          .map((packages, index) => (
            <tr key={packages._id}>
              <th scope="row">{index + 1}</th>
              <td>{packages.vehicleType}</td>
              <td>{packages.packagename}</td>
              <td>{packages.Personcount}</td>
              <td>{packages.distance}</td>
              <td>{packages.duration}</td>
              <td>{packages.price}</td>


              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => hadleEdit(packages._id)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn"
                  onClick={() => handleDelete(packages._id)}
                  style={{ backgroundColor: "red",color:'black'}}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
  )
}

export default Packagemanagment