import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Feature() {
  const [vehicles, setVehicles] = useState([]);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/vehicle/allvehicle");
        setVehicles(response.data); // Assuming the response contains the array of vehicles
      } catch (error) {
        console.error("Error fetching data: ", error);
        // Handle errors here, for example, by setting an error state
      }
    };

    fetchData();
  }, []);

  const filteredVehicles = () => {
    if (filter === "all") {
      return vehicles;
    } else {
      return vehicles.filter((vehicle) => vehicle.vehicletype === filter);
    }
  };
  return (
    <div>
      <section class="section featured-car" id="featured-car">
        <div class="container">
          {" "}
          <div class="title-wrapper">
            <h2 class="h2 section-title">Featured cars</h2>
          </div>
          <div className="d-flex justify-content-end mx-2">
            <button className="btn btn-primary mx-2" onClick={() => setFilter("all")}>All</button>{" "}
            {/* Button to show all vehicles */}
            <button className="btn btn-primary mx-2" onClick={() => setFilter("car")}>Car</button>{" "}
            {/* Button to filter by car */}
            <button className="btn btn-primary mx-2" onClick={() => setFilter("van")}>Van</button>{" "}
            {/* Button to filter by van */}
          </div>
          {/* Button to filter by van */}
          <ul class="featured-car-list">
            {filteredVehicles().map((vehicle) => (
              <li key={vehicle._id}>
                <div className="featured-car-card">
                  <figure className="card-banner">
                    {/* Replace with your dynamic image URL */}
                    <img
                      src={
                        vehicle.image
                          ? `http://localhost:5000/${vehicle.image.replace(
                              /\\/g,
                              "/"
                            )}`
                          : "imgae is loading"
                      }
                      alt={vehicle.vehicleName || "Default Vehicle Name"}
                      loading="lazy"
                      width="440"
                      height="300"
                      className="w-100"
                    />
                  </figure>

                  <div className="card-content">
                    <div className="card-title-wrapper">
                      <h3 className="h3 card-title">
                        {vehicle.vehicleName}{" "}
                        <span
                          style={{ fontSize: "15px" }}
                          className="text-success"
                        >
                          <b>{vehicle.vehicletype}</b>
                        </span>
                      </h3>

                      {/* Additional vehicle details can be added here */}
                    </div>

                          {vehicle.seatCapacity} People
                
                    <div className="card-price-wrapper">
                    
                      <button
                        className="btn fav-btn"
                        aria-label="Add to favourite list"
                      >
                        <ion-icon name="heart-outline">
                          {vehicle.condition}
                        </ion-icon>
                      </button>
                        <Link to={'/selectpackage'}>

                      <button className="btn btn-primary">Rent now</button>
                        </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Feature;
