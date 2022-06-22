import { Tabs } from "antd";
import React, { useState, useEffect } from "react";
import { Divider, Tag } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import swal from "sweetalert";

const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="mt-3" style={{ marginLeft: "15px" }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <br />
          <h1>Name : {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <h1>Admin Priviledges: {user.isAdmin ? "Yes" : "No"}</h1>
        </TabPane>
        <TabPane tab="My Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const rooms = await (
          await axios.post("/api/bookings/getbookingsbyuserid", {
            userid: user._id,
          })
        ).data;
        setBookings(rooms);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log("Error : ", error);
      }
    };
    fetchData();
  }, []);

  const cancelBooking = async (bookingid, roomid) => {
    try {
      setLoading(true);
      const result = await (
        await axios.post("/api/bookings/cancelbooking", {
          bookingid,
          roomid,
        })
      ).data;
      setLoading(false);
      swal(
        "Congratulations",
        "Your Booking has been cancelled",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (e) {
      setLoading(false);
      setError(true);
      swal("Oops", "Something went wrong!", "error");
      console.log(e);
    }
  };

  return (
    <div>
      <div className="col-md-6">
        {loading && <Loader />}

        {bookings &&
          bookings.map((booking) => {
            return (
              <div className="bs">
                <h1>{booking.room}</h1>
                <p>
                  <b>Booking Id</b>: {booking._id}
                </p>
                <p>
                  <b>Check In</b> : {booking.fromDate}
                </p>
                <p>
                  <b>Check Out</b> : {booking.toDate}
                </p>
                <p>
                  <b>Amount :</b> {booking.totalAmount}
                </p>
                <p>
                  <b>Status : </b>
                  {booking.status === "booked" ? (
                    <Tag color="green">CONFIRMED</Tag>
                  ) : (
                    <Tag color="red">CANCELLED</Tag>
                  )}
                </p>
                {booking.status !== "cancelled" && (
                  <div style={{ textAlign: "right" }}>
                    <button
                      onClick={() => {
                        cancelBooking(booking._id, booking.roomid);
                      }}
                      className="btn btn-primary"
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
