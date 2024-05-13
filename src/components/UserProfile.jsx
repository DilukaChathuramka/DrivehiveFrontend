import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user, setUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [order, setOrder] = useState("");
  const id = user && user._id;
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phoneNo: user.phoneNo,
      });
    }

    if (user && user.role === "user") {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/user/getOrder/${id}`); // Replace 123 with the actual ID
          console.log(response.data); // Do something with the response data
          setOrder(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [user, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUserData = {
      ...user,
      name: formData.name,
      email: formData.email,
      phoneNo: formData.phoneNo,
    };
    try {
      const response = await axios.patch(
        `/user/edituser/${user._id}`,
        updatedUserData
      );
      if (response.status === 201) {
        setUser(response.data);
        setMessage("User details updated successfully");
      }
    } catch (err) {
      console.error("Error updating user:", err);
    }

    // setUser(updatedUserData);
    setEditMode(false);
  };

  return (
    <div className="container">
      <div className="main-body">
        <div className="row profile d-flex align-items-center">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body-profile d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar6.png"
                    alt="Admin"
                    className="rounded-circle p-1 bg-primary"
                    width="110"
                  />
                  <div className="mt-3">
                    <h4>{user && user.name}</h4>
                  </div>
                  <button className="btn btn-primary mb-3" onClick={handleEdit}>
                    Edit Details
                  </button>
                  {user && user.role === "driver" ? (
                    <Link to={"/user-leave"}>
                      <button className="btn btn-primary">Leave Form</button>{" "}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            {message ? (
              <p className="alert alert-success">{message}</p>
            ) : errMsg ? (
              <p className="alert alert-danger">{errMsg}</p>
            ) : null}
            <h2>User Profile</h2>
            <div>
              <div
                className="card-body d-flex justify-content-center"
                style={{ flexDirection: "column" }}
              >
                <form onSubmit={handleSubmit}>
                  <div class="row mb-3">
                    <div class="col-sm-3 d-flex align-items-center justify-content-center">
                      <h6 class="mb-0">Name</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!editMode}
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-3 d-flex align-items-center justify-content-center">
                      <h6 class="mb-0">E mail</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!editMode}
                      />
                    </div>
                  </div>{" "}
                  <div class="row mb-3">
                    <div class="col-sm-3 d-flex align-items-center justify-content-center">
                      <h6 class="mb-0">Phone No</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        disabled={!editMode}
                      />
                    </div>
                  </div>
                  {editMode && (
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        {user && user.role==='user'?<h2 className="mb-2">Order History</h2>:null}
        {order &&
          order.map((orders) => (
            <div className="card mb-3" key={orders._id}>
              <div className="card-body">
                <h5 className="card-title">Order ID:{orders._id}</h5>
                <p className="card-text">
                  Date: {orders && new Date(orders.date).toLocaleDateString()}
                </p>
                <p className="card-text">
                  Time: {orders && new Date(orders.date).toLocaleTimeString()}
                </p>
                <p className="card-text">Package Type: {orders.packageType}</p>
                <p className="card-text">Total: {orders.total}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserProfile;
