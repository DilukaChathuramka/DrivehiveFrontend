import axios from "axios";

import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
function AllCustomize() {
  const [pack, setPack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/customizepack/getallcustompackage");
        setPack(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.put(`/customizepack/detelecustompack/${id}`);
      const response = await axios.get("/customizepack/getallcustompackage");
      setPack(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = (pack || []).filter((data) =>
  data.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  data.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
  data.user.phoneNo.toString().includes(searchQuery)
);


const downloadPdfDocument = () => {
  const input = document.getElementById("table-to-xport"); // Ensure your table has this id
  const deleteHeader = input.querySelector("th:nth-child(9)"); // Select the header with nth-child(9), assuming it's the 9th column
  deleteHeader.style.display = "none"; // Hide the "Delete" header

  const deleteButtons = input.querySelectorAll(".btn-danger"); // Select all delete buttons
  deleteButtons.forEach(button => button.style.display = "none"); // Hide all delete buttons

  html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
          orientation: "landscape",
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("report.pdf");

      // After generating PDF, show the header and delete buttons again
      deleteHeader.style.display = ""; // Show the "Delete" header again
      deleteButtons.forEach(button => button.style.display = ""); // Show all delete buttons again
  });
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
  return (
    <div>
      <div>
        <button className="btn btn-primary mb-3" onClick={downloadPdfDocument}>
          Download
        </button>
      </div>
      <div className="search-container col-5 mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone number"
          style={{border:'3px solid',borderRadius:'15px',fontSize:'20px'}}
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <table class="table table-striped" id="table-to-xport">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone no</th>
            <th scope="col">vehicle Name</th>
            <th scope="col">Drive Name</th>
            <th scope="col">Duration (days)</th>
            <th scope="col">Distance(km)</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers &&
           filteredUsers.filter((data) => data.isActive).map((data, index) => (
              <tr key={data.user && data._id}>
                <td>{index + 1}</td>
                <td>{data.user && data.user.name}</td>
                <td>{data.user && data.user.email}</td>
                <td>{data.user && data.user.phoneNo}</td>
                <td>{data.user && data.vehicle.vehicleName}</td>
                <td>{data.user && data.driver.name}</td>
                <td>{data.user && data.duration}</td>
                <td>{data.user && data.distance}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(data._id)}
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

export default AllCustomize;
