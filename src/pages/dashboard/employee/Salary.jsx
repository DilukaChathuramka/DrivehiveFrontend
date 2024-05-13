import axios from "axios";
import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

function Salary() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/driver/allAttence");
        setUsers(response.data);
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
      await axios.patch(`/emp/editemp/${id}`);
      const response = await axios.get("/emp/getAll");
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadExcel = () => {
    const usersData = users.map((user, index) => ({
        "No": index + 1,
        "Name": user.driver.name,
        "Email": user.driver.email,
        "Phone no": user.driver.phoneNo,
        "Attendance Count": user.count,
        "Payment Amount": user.count * 2000
    }));

    const worksheet = XLSX.utils.json_to_sheet(usersData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Driver_Attendance");

    // Define a date for file naming
    let date = new Date().toISOString().slice(0, 10);

    // Trigger the download
    XLSX.writeFile(workbook, `Driver_Attendance_${date}.xlsx`);
};
  const hadleEdit = async (id) => {
    navigate(`/empEdit-edit/${id}`);
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
       
      </div>
      <button onClick={downloadExcel} className="btn btn-success mb-3">
        Download Excel Report
      </button>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone no</th>
            <th scope="col">Attendance Count</th>
            <th scope="col">payement Amount</th>
          </tr>
        </thead>
        <tbody>
          {users
            .map((user, index) => (
              <tr key={user._id}>
                <th scope="row">{index + 1}</th>
                <td>{user && user.driver.name}</td>
                <td>{user && user.driver.email}</td>
                <td>{user && user.driver.phoneNo}</td>
                <td>{user && user.count}</td>
                <td>{user && user.count*2000}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Salary;
