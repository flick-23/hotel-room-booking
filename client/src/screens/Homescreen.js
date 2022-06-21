import React, { useState, useEffect, isValidElement } from "react";
import axios from "axios";
import Room from "../components/Room";

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.get("/api/rooms/getAllRooms")).data;
        setRooms(data.rooms);
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

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>Loading</h1>
        ) : error ? (
          <h1>Error</h1>
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room room={room} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
