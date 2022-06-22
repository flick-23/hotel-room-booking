import React, { useState, useEffect, isValidElement } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import "antd/dist/antd.css";
import moment from "moment";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.get("/api/rooms/getAllRooms")).data;
        setRooms(data.rooms);
        setDuplicateRooms(data);
        setError(false);
        setLoading(false);
      } catch (e) {
        setError(true);
        console.error("Error : ", e);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filterByDate = (dates) => {
    setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
    setToDate(moment(dates[1]).format("DD-MM-YYYY"));

    let tempRooms = [];
    let availability = false;
    for (const room of duplicateRooms) {
      if (room.currentBookings.length > 0) {
        for (const booking of room.currentBookings) {
          if (
            !moment(dates[0])
              .format("DD-MM-YYYY")
              .isBetween(booking.fromDate, booking.toDate) &&
            !moment(dates[1])
              .format("DD-MM-YYYY")
              .isBetween(booking.fromDate, booking.toDate)
          ) {
            if (
              moment(dates[0]).format("DD-MM-YYYY") !== booking.fromDate &&
              moment(dates[0]).format("DD-MM-YYYY") !== booking.toDate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.fromDate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.toDate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability == true || room.currentBookings.length == 0) {
        tempRooms.push(room);
      }
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : rooms.length > 1 ? (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room fromDate={fromDate} toDate={toDate} room={room} />
              </div>
            );
          })
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default Homescreen;
