import axios from "axios";
import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";

function Leavemanagment() {
  const [leave, setLeave] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(null);
  
  const [accept, setAccept] = useState(0);
  const [pending, setPending] = useState(0);
  const fetchleavs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/driver/getAllleaves");
      setLeave(response.data);
      setPending(response.data.filter(leave => leave.approve===false).length);
      setAccept(response.data.filter(leave => leave.approve === true).length);

    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchleavs();
  }, []);

  const handelpending = async (id) => {
    try {
      const response = await axios.patch(`/driver/accetleaves/${id}`);
      setMsg(response.data.message);
      await fetchleavs(); // Refresh leave data after update
    } catch (err) {
      console.error(err);
    }
  };

  const handeldelete = async (id) => {
    try {
      const response = await axios.patch(`/driver/deleteleavs/${id}`);
      setMsg(response.data.message);
      await fetchleavs(); // Refresh leave data after update
    } catch (err) {
      console.error(err);
    }
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
  console.log(leave);
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
                    Accept leaves (Total)
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {accept}
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
                    Pending (Total)
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{pending}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">User Name</th>
            <th scope="col">email</th>
            <th scope="col">Phone No</th>

            <th scope="col">Title</th>
            <th scope="col">Message</th>
            <th scope="col">Date</th>

            <th scope="col">Accept</th>
          </tr>
        </thead>
        {leave &&
          leave.map((leave, index) => (
            <tbody>
              <tr key={leave._id}>
                <th scope="row">{index + 1}</th>
                <td>{leave.user && leave.user.name}</td>
                <td>{leave.user && leave.user.email}</td>
                <td>{leave.user && leave.user.phoneNo}</td>
                <td>{leave.title}</td>
                <td>{leave.message}</td>
                <td>{leave.date}</td>

                <td>
                  {leave.approve === false ? (
                    <button
                      className="btn btn-success"
                      onClick={() => handelpending(leave._id)}
                      style={{ color: "black" }}
                    >
                      pending
                    </button>
                  ) : (
                    <button
                      className="btn"
                      style={{ backgroundColor: "green", color: "black" }}
                    >
                      accepted
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handeldelete(leave._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
}

export default Leavemanagment;
