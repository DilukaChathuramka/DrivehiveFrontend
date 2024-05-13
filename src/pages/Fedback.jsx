import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { BallTriangle } from "react-loader-spinner";
import axios from "axios";
function Fedback() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDriverFeedback = () => {
    navigate("/feedback-form?feedbackTo=driver");
  };

  const handleCarFeedback = () => {
    navigate("/feedback-form?feedbackTo=car");
  };

  const fetchFeedback = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/feedback/getfeedback");
      setFeedback(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);
console.log(feedback)
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
    <section class="bg-light py-3 py-md-5">
      <div class="container">
        <div className="d-flex mx-2">
          <button className="btn" onClick={handleDriverFeedback}>
            Feedback to Driver
          </button>
          <button
            className="btn mx-3"
            style={{ backgroundColor: "green" }}
            onClick={handleCarFeedback}
          >
            Feedback to Car
          </button>
        </div>
        {feedback.filter(feedbackItem => feedbackItem.status === 'true').map((feedback) => (
          <div className="show-feedback">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <FaCircleUser size={30} />
                <h4 className="mx-2">{feedback.userfeed && feedback.userfeed.name}</h4>
              </div>
              <h5 className="d-flex justify-content-end">{
                   <p>
                   {new Date(feedback.createdAt).toLocaleString("en-US", {
                     year: "numeric",
                     month: "long",
                     day: "numeric",
                     hour: "2-digit",
                     minute: "2-digit",
                     second: "2-digit"
                   })}
                 </p>
              }</h5>
            </div>
            <div className="d-flex align-items-center mb-4">
             <b>
             {feedback.vehiclefeed ? 'Vehicle Name: ' + (feedback.vehiclefeed.vehicleName ? feedback.vehiclefeed.vehicleName : 'Unknown') : 'Driver Name: ' + (feedback.driverfeed ? feedback.driverfeed.name : 'Unknown')}

               </b>

             
            </div>
            <div className="feedback-message">
              <p>{feedback.message}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Fedback;
