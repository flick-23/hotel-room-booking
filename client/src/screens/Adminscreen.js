import { Tabs } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

const { TabPane } = Tabs;

function Adminscreen() {
  return (
    <div
      className="mt-3  bs"
      style={{ marginLeft: "15px", marginRight: "15px" }}
    >
      <h4 className="text-center" style={{ fontSize: "25px" }}>
        ADMIN PANEL
      </h4>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          Rooms
        </TabPane>
        <TabPane tab="Add Room" key="3">
          Add Room
        </TabPane>
        <TabPane tab="Users" key="4">
          Users
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (
          await axios.get("/api/bookings/getallbookings")
        ).data;
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="row">
      {loading && <Loader />}
      {bookings.length && <h1>Total bookings: {bookings.length}</h1>}
    </div>
  );
}
