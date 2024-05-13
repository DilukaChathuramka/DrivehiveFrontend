import axios from "axios";
import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";

function Userlog() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/emp/alllog");
        setUsers(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
        <div>
           <h2 className="mb-3">User Login Report
            </h2> 
        </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone no</th>
            <th scope="col">Login Time</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            // Convert timestamp string to a Date object
            const dateObj = new Date(user.timestamp);

            // Format the date (MM/DD/YYYY)
            const formattedDate = `${
              dateObj.getMonth() + 1
            }/${dateObj.getDate()}/${dateObj.getFullYear()}`;

            // Format the time (HH:MM:SS)
            const formattedTime = `${dateObj.getHours()}:${(
              "0" + dateObj.getMinutes()
            ).slice(-2)}:${("0" + dateObj.getSeconds()).slice(-2)}`;

            // Render the table row with adjusted date and time format
            return (
              <tr key={user._id}>
                <th scope="row">{index + 1}</th>
                <td>{user.userId && user.userId.name}</td>
                <td>{user.userId && user.userId.email}</td>
                <td>{user.userId && user.userId.phoneNo}</td>
                <td>{`${formattedDate} ${formattedTime}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Userlog;
