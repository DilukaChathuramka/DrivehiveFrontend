import React, { useEffect, useState } from "react";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { useParams } from 'react-router-dom';
import { useUser } from "../context/UserContext";
import Swal from 'sweetalert2';

function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { name } = useParams();
  const { user } = useUser();


  const  checklogin =( id, packname, price )=>{
      if(!user){
        navigate ('/login')
      }else {
        const {name } = user;
        
        // Show confirmation dialog using SweetAlert
        Swal.fire({
          title: `Hi ${name}, are you sure you want to proceed to payment for the ${packname} package?`, // Assuming you want to show the user's name and package name
          text: `The price of the package is ${price}.`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, proceed to payment',
          cancelButtonText: 'No, cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            // User clicked "Yes", navigate to payment page
         
            const queryParams = new URLSearchParams({ id, packname, price,packageType:"standard" }).toString();
            navigate(`/payment?${queryParams}`);
          } else {
            // User clicked "No" or closed the dialog, do nothing
          }
        });
      }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/package/getpackage");
        setPackages(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
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
    <>
      <h2 className="text-center">{name} Packages</h2>
      <div class="wrapper">
        {packages
          .filter((pkg) => pkg.vehicleType ===name && pkg.isActive)
          .map((pkg) => (
            <div class="table basic">
              <div class="price-section">
                <div class="price-area">
                  <div class="inner-area">
                    <span class="text">Rs</span>
                    <span class="price">{pkg.price}</span>
                  </div>
                </div>
              </div>
              <div class="package-name mb-5">{pkg.packagename}</div>
              <ul class="features">
                <li>
                  <span class="list-name">Person Count: {pkg.Personcount}</span>
                  <span class="icon check">
                    <TiTick />
                  </span>
                </li>
                <li>
                  <span class="list-name">Distance : {pkg.distance}</span>
                  <span class="icon check">
                    <TiTick />
                  </span>
                </li>
                <li>
                  <span class="list-name">Duration : {pkg.duration} Days</span>
                  <span class="icon cross">
                    <TiTick />
                  </span>
                </li>
                <li>
                  <span class="list-name">Driver : {pkg.driver}</span>
                  <span class="icon cross">
                    <TiTick />
                  </span>
                </li>
                <li>
                  <span class="list-name">Condition: {pkg.condtion}</span>
                  <span class="icon cross">
                    <TiTick />
                  </span>
                </li>
              </ul>
              <div class="">
                <button
                  onClick={()=>checklogin(pkg._id, pkg.packagename, pkg.price)}
                  className="btn package"
                >
                  Purchase
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Packages;
