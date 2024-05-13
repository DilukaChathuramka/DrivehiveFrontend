import axios from "axios";
import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useParams } from "react-router-dom";

function PackageAddForm() {
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [data, setData] = useState({
    vehicleType: "",
    packagename: "",
    Personcount: "",
    distance: "",
    duration: "",
    driver: "",
    price: "",
    condition: "",
  });
  const { id } = useParams();
  if (id) {
    useEffect(() => {
      const fetchdriver = async () => {
        try {
          const response = await axios.get(`/package/onegetpack/${id}`);
          setData(response.data);
          setIsLoading(true);
        } catch (err) {
          setErrMsg(err);
          setIsLoading(false);
        }
      };
      fetchdriver();
    }, []);
  }
  const handlePersonCountChange = (e) => {
    const value = e.target.value;
    setData({ ...data, Personcount: value });
    if (parseInt(value) > 4) {
      setAlertVisible(true);
    } else {
      setAlertVisible(false);
    }
  };
  const vehicleHandler = async (e) => {
    e.preventDefault();
    const {
      vehicleType,
      packagename,
      Personcount,
      distance,
      duration,
      driver,
      price,
      condition,
    } = data;
    if (id) {
      try {
        const response = await axios.patch(`/package/editpack/${id}`, {
          vehicleType,
          packagename,
          Personcount,
          distance,
          duration,
          driver,
          price,
          condition,
        });
        if (response.data.message) {
          setData({
            vehicleType: "",
            packagename: "",
            Personcount: "",
            distance: "",
            duration: "",
            driver: "",
            price: "",
            condition: "",
          });
          setMessage(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          // Server-sent error message
          setErrMsg(error.response.data.message || "Failed to add package.");
        } else {
          // Generic or network error
          setErrMsg("An unexpected error occurred.");
        }
      }
    } else {
      try {
        const response = await axios.post("/package/addpackage", {
          vehicleType,
          packagename,
          Personcount,
          distance,
          duration,
          driver,
          price,
          condition,
        });
        if (response.data.message) {
          setData({
            vehicleType: "",
            packagename: "",
            Personcount: "",
            distance: "",
            duration: "",
            driver: "",
            price: "",
            condition: "",
          });
          setMessage(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          // Server-sent error message
          setErrMsg(error.response.data.message || "Failed to add package.");
        } else {
          // Generic or network error
          setErrMsg("An unexpected error occurred.");
        }
      }
    }
  };

  if (!isLoading) {
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
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-10">
          <h1 className="h3 mb-0 text-gray-800 mb-3">ADD Package</h1>
          {message ? (
            <p className="alert alert-success">{message}</p>
          ) : errMsg ? (
            <p className="alert alert-danger">{errMsg}</p>
          ) : null}
          <form class="row g-3 " method="POST" onSubmit={vehicleHandler}>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="vehicleType"
                id="flexRadioDefault1"
                value="car"
                onChange={(e) =>
                  setData({
                    ...data,
                    vehicleType: e.target.value,
                  })
                }
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Car
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="vehicleType"
                id="flexRadioDefault2"
                value="van"
                onChange={(e) =>
                  setData({
                    ...data,
                    vehicleType: e.target.value,
                  })
                }
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Van
              </label>
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">
                Package Name
              </label>
              <input
                type="text"
                class="form-control"
                id="phoneno"
                value={data.packagename}
                onChange={(e) => {
                  setData({ ...data, packagename: e.target.value });
                }}
              />
            </div>
            <div class="col-6">
              <label for="inputAddress" class="form-label">
                Person count
              </label>
              <input
            type="text"
            className="form-control"
            id="inputAddress"
            value={data.Personcount}
            onChange={handlePersonCountChange}
          />
          {alertVisible && (
            <div className="alert alert-danger mt-2" role="alert">
              Person count cannot be greater than 4.
            </div>
          )}
            </div>
            <div class="col-6">
              <label for="inputAddress" class="form-label">
                Distance
              </label>
              <input
                type="text"
                class="form-control"
                id="inputnn"
                value={data.distance}
                onChange={(e) => {
                  setData({ ...data, distance: e.target.value });
                }}
              />
            </div>
            <div class="col-6">
              <label for="inputAddress" class="form-label">
                Duration
              </label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                value={data.duration}
                onChange={(e) => {
                  setData({ ...data, duration: e.target.value });
                }}
              />
            </div>
            <div class="col-6">
              <label for="inputAddress" class="form-label">
                Price
              </label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                value={data.price}
                onChange={(e) => {
                  setData({ ...data, price: e.target.value });
                }}
              />
            </div>
            <div className="col-6">
              <div class="form-check">
                <label for="inputdriver" class="form-label">
                  Have Driver ?
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="driver"
                  value="yes"
                  id="flexRadioDefault1"
                  onChange={(e) => {
                    setData({ ...data, driver: e.target.value });
                  }}
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  yes
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="driver"
                  value="No"
                  id="flexRadioDefault2"
                  onChange={(e) => {
                    setData({ ...data, driver: e.target.value });
                  }}
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  No
                </label>
              </div>
            </div>
            <div className="col-6">
              <div class="form-check">
                <label for="inputdriver" class="form-label">
                  Condition ?
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="condition"
                  value="Ac"
                  id="flexRadioDefault1"
                  onChange={(e) => {
                    setData({ ...data, condition: e.target.value });
                  }}
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  AC
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="condition"
                  value="Non-Ac"
                  id="flexRadioDefault2"
                  onChange={(e) => {
                    setData({ ...data, condition: e.target.value });
                  }}
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  Non-AC
                </label>
              </div>
            </div>
            <div class="col-12 d-flex justify-content-center">
              <button
                type="submit"
                class="btn btn-primary"
                style={{ width: "250px", height: "50px" }}
              >
               {id ? "Update" : "Add package"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PackageAddForm;
