import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import swal from "sweetalert";

function Bookingscreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const params = useParams();

  const roomid = params.roomid;
  const fromDate = moment(params.fromDate, "DD-MM-YYYY");
  const toDate = moment(params.toDate, "DD-MM-YYYY");

  const totalDays = moment.duration(toDate.diff(fromDate)).asDays() + 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (
          await axios.post("/api/rooms/getRoomsById", { roomid: params.roomid })
        ).data;
        setTotalAmount(totalDays * data.rentperday);
        setRoom(data);
        setLoading(false);
      } catch (e) {
        setError(true);
        console.error("Error : ", e);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const bookRoom = async () => {};

  const onToken = async (token) => {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromDate,
      toDate,
      totalAmount,
      token,
      totalDays,
    };
    try {
      setLoading(true);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      setLoading(false);
      swal(
        "Congratulation!",
        "Your room is booked successfully!",
        "success"
      ).then((result) => {
        window.location.href = "/bookings";
      });
    } catch (e) {
      setLoading(false);
      console.error("Error : ", e);
      swal.fire("Ruh-roh!", "Something went wrong!", "error");
    }
  };

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1> <hr />
                <b>
                  <p>
                    Name :{" "}
                    {JSON.parse(localStorage.getItem("currentUser")).name}
                  </p>
                  <p>From Date : {params.fromDate}</p>
                  <p>To Date : {params.toDate}</p>
                  <p>Max count : {room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <h1>Amount</h1>
                <hr />
                <b>
                  <p>Total days : {totalDays} </p>
                  <p>Rent per day : {totalAmount}</p>
                  <p>Total Amount : </p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={totalAmount * 100}
                  token={onToken}
                  currency="INR"
                  stripeKey="pk_test_51LDTa1SGuzP037r7qtpq0DuBN51knDJeW9PCmCprzpGlMu6LXMEI2aNRdnvoT2VFNtQ1EDIiOsofuoTKqMXgiMQL00XjnhmeXZ"
                >
                  <button className="btn btn-primary">Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
