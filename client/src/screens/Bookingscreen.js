import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function Bookingscreen() {
  const [loading, setLoading] = useState();
  const [error, setError] = useState(false);
  const [room, setRoom] = useState();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (
          await axios.post("/api/rooms/getRoomsById", { roomid: params.roomid })
        ).data;
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

  return (
    <div>
      <h1>Room id={params.roomid}</h1>
    </div>
  );
}

export default Bookingscreen;
