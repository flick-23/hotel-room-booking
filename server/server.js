const express = require("express");
const app = express();

const dbconfig = require("./db");
const roomsRoute = require("./routes/room.router");
const userRoute = require("./routes/user.router");
const bookingRoute = require("./routes/booking.router");

app.use(express.json());
app.use("/api/rooms", roomsRoute);
app.use("/api/users", userRoute);
app.use("/api/bookings", bookingRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server started! DB looks fine :)"));
