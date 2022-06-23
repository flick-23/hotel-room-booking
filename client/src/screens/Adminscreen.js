import { Tabs } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import swal from "sweetalert";

const { TabPane } = Tabs;

function Adminscreen() {
  useEffect(() => {
    const fetchData = async () => {
      if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
        window.location.href = "/home";
      }
    };
    fetchData();
  }, []);

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
          <Rooms />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <AddRoom />
        </TabPane>
        <TabPane tab="Users" key="4">
          <User />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

// Bookings component
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
      <div>
        {loading && <Loader />}
        {bookings.length && (
          <h1>
            <center>Bookings</center>
          </h1>
        )}
        <table className="table table-bordered table-dark">
          <thead className="bs thead-dark">
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromDate}</td>
                    <td>{booking.toDate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Rooms component
export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("/api/rooms/getAllRooms");
        setRooms(data.data.rooms);
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
      <div>
        {loading && <Loader />}
        {rooms.length && (
          <h1>
            <center>Rooms</center>
          </h1>
        )}
        <table className="table table-bordered table-dark">
          <thead className="bs thead-dark">
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent Per Day</th>
              <th>Max Count</th>
              <th>Ph Number</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Users component
export function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (await axios.get("/api/users/getallusers")).data;
        setUsers(data);
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
      <div>
        {loading && <Loader />}
        {users.length && (
          <h1>
            <center>Users</center>
          </h1>
        )}
        <table className="table table-bordered table-dark">
          <thead className="bs thead-dark">
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "Yes" : "No"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//adding rooms component
export function AddRoom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [name, setName] = useState("");
  const [rentperday, setRentperday] = useState("");
  const [maxcount, setMaxCount] = useState();
  const [description, setDescription] = useState();
  const [phonenumber, setPhoneNumber] = useState();
  const [type, setType] = useState();
  const [imageUrl1, setImageUrl1] = useState();
  const [imageUrl2, setImageUrl2] = useState();
  const [imageUrl3, setImageUrl3] = useState();

  const addRoom = async () => {
    const newRoom = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [imageUrl1, imageUrl2, imageUrl3],
    };
    try {
      setLoading(true);
      const result = await (
        await axios.post("/api/rooms/addRoom", newRoom)
      ).data;
      console.log("Result: ", result);
      setLoading(false);
      swal("Congratulations!", "New Room added successfully!", "success").then(
        (result) => {
          window.location.href = "/home";
        }
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
      swal("Error!", "Something went wrong!", "error");
    }
  };

  return (
    <div className="row">
      <div className=" col-md-5">
        {loading && <Loader />}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form-control mt-1"
          placeholder="Room Name"
        />
        <input
          value={rentperday}
          onChange={(e) => setRentperday(e.target.value)}
          type="number"
          className="form-control mt-2"
          placeholder="Rent Per Day"
        />
        <input
          value={maxcount}
          onChange={(e) => setMaxCount(e.target.value)}
          type="number"
          className="form-control mt-2"
          placeholder="Max Count"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          className="form-control mt-2"
          placeholder="Description"
        />
        <input
          value={phonenumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="number"
          className="form-control mt-2"
          placeholder="Phone Number"
        />
      </div>
      <div className="col-md-5">
        <input
          value={type}
          onChange={(e) => setType(e.target.value)}
          type="text"
          className="form-control mt-1"
          placeholder="Type"
        />
        <input
          value={imageUrl1}
          onChange={(e) => setImageUrl1(e.target.value)}
          type="text"
          className="form-control mt-2"
          placeholder="Image URL 1"
        />
        <input
          value={imageUrl2}
          onChange={(e) => setImageUrl2(e.target.value)}
          type="text"
          className="form-control mt-2"
          placeholder="Image URL 2"
        />
        <input
          value={imageUrl3}
          onChange={(e) => setImageUrl3(e.target.value)}
          type="text"
          className="form-control mt-2"
          placeholder="Image URL 3"
        />
        <div className="text-right mt-2" style={{ textAlign: "right" }}>
          <button onClick={addRoom} className="btn btn-primary">
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}
