import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function PayementDetails() {
  const { id } = useParams();
  const [payment, setPayment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchpayment = async () => {
      try {
        const response = await axios.get(`/payment/getpayemnt/${id}`);
        setPayment(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchpayment();
  }, []);
  if (!payment || !payment.packageName) {
    // You can render a loading spinner or a message here
    return <div>Loading...</div>;
}
  console.log(payment);
  return (
    <div className="container">
      <div className="details-box">
      <div>
        

       
            <h2>Payment Information</h2>
            <p>ID: {payment._id}</p>
            <p>User ID: {payment.user}</p>
            <p>Package Name: {payment.packageName.packagename}</p>
            <p>Package Type: {payment.packageType}</p>
            <p>Payment Type: {payment.payementType}</p>
            <p>Total: {payment.total}</p>
            
            <h3>Bill Details</h3>
            {payment.billDetails.map((bill, index) => (
                <div key={bill._id}>
                    <p>Address: {bill.address}</p>
                    <p>Phone Number: {bill.phoneNo}</p>
                   
                </div>
            ))}

            <h3>Card Details</h3>
            {payment.cardDetails.map((card, index) => (
                <div key={card._id}>
                   <p>Card Number: {"x".repeat(card.cardNumber.length - 4) + card.cardNumber.substring(card.cardNumber.length - 4)}</p>
                </div>
            ))}
        
        </div>
      </div>
            
    </div>
  );
}

export default PayementDetails;
