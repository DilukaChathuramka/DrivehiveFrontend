import axios from "axios";
import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
function ShowFeeback() {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(null);
  const  [driverFeedbackCount,setDriverFeedbackCount]=useState(0);
  const [vehicleFeedbackCount,setVehicleFeedbackCount]=useState(0);
  const [pending,setPending]=useState(0);
  const [searchQuery, setSearchQuery] = useState("");
    const fetchFeedback = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/feedback/getfeedback");
      setFeedback(response.data);
      setDriverFeedbackCount(response.data.filter(item => item.driverfeed).length);
      setVehicleFeedbackCount(response.data.filter(item => item.vehiclefeed).length);
      setPending(response.data.filter(feedback => feedback.status === "pending").length);

    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchFeedback();
  }, []); 
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = feedback.filter((feedback) => {
    const userMatch = feedback.userfeed.name.toLowerCase().includes(searchQuery.toLowerCase());
  
    if (feedback.vehiclefeed) {
      const vehicleMatch = feedback.vehiclefeed.vehicleName.toLowerCase().includes(searchQuery.toLowerCase());
      return userMatch || vehicleMatch;
    } else {
      return userMatch;
    }
  });
  const totalFeedbackCount = feedback.length;
  const handelpending = async (id) => {
    try {
      const response = await axios.put(`/feedback/acceptfeedback/${id}`);
      setMsg(response.data.message);
      await fetchFeedback(); // Refresh feedback data after update
    } catch (err) {
      console.error(err);
    }
  };

  const handeldelete = async (id) => {
    try {
      const response = await axios.put(`/feedback/deletefeedback/${id}`);
      setMsg(response.data.message);
      await fetchFeedback(); // Refresh feedback data after update
    } catch (err) {
      console.error(err);
    }
  }
console.log(driverFeedbackCount)
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
  console.log(feedback);
  return (
    <div>
      {msg ? (
        <p className="alert alert-success">{msg}</p>
      ) : error ? (
        <p className="alert alert-danger">{error}</p>
      ) : null}
       <div className="row">
    {/*  <!-- Earnings (Monthly) Card Example --> */}
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-left-primary shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                Total Feedbacks
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
               {totalFeedbackCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/*  <!-- Earnings (Monthly) Card Example --> */}
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-left-success shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
               Car Feedback(Total)
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {vehicleFeedbackCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/*  <!-- Earnings (Monthly) Card Example --> */}
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-left-info shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
               Driver FeedBack(Total)
              </div>
              <div className="row no-gutters align-items-center">
                <div className="col-auto">
                  <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                    {driverFeedbackCount}
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/*  <!-- Pending Requests Card Example --> */}
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-left-warning shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                Pending Requests
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {pending}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="search-container col-5 mb-4">
        <input
          type="text"
          placeholder="Search by name or vehicel name"
          style={{border:'3px solid',borderRadius:'15px',fontSize:'20px'}}
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">User Name</th>
            <th scope="col">vehicle Name</th>
            <th scope="col">Driver Name</th>

            <th scope="col">Message</th>
            <th scope="col">Accept</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        {filteredUsers  &&
          filteredUsers.map((feedback, index) => (
            <tbody>
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{feedback.userfeed && feedback.userfeed.name}</td>
                <td>
                  {feedback.vehiclefeed ? (
                    feedback.vehiclefeed.vehicleName
                  ) : (
                    <p>No feedback to vehicle</p>
                  )}
                </td>

                <td>
                  {feedback.driverfeed ? (
                    feedback.driverfeed.name
                  ) : (
                    <p>No feedback to driver</p>
                  )}
                </td>

                <td>{feedback.message}</td>
                <td>
                  {feedback.status === "pending" ? (
                    <button
                      className="btn btn-success"
                      onClick={() => handelpending(feedback._id)}
                      style={{color:'black'}}
                    >
                      pending
                    </button>
                  ) : (
                    <button
                      className="btn"
                      style={{ backgroundColor: "green",color:'black' }}
                    >
                      accepted
                    </button>
                  )}
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handeldelete(feedback._id)}>Delete</button>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
}

export default ShowFeeback;
