const express = require("express");
const router = express.Router();
const moment = require("moment");
const Room = require("../models/room.model");
const Booking = require("../models/booking.model");

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromDate, toDate, totalAmount, totalDays } = req.body;
  try {
    const newBooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromDate: moment(fromDate).format("DD-MM-YYYY"),
      toDate: moment(toDate).format("DD-MM-YYYY"),
      totalAmount,
      totalDays,
      transactionId: "1234",
    });
    const booking = await newBooking.save();

    const roomtemp = await Room.findOne({ _id: room._id });

    roomtemp.currentBookings.push({
      bookingid: booking._id,
      fromDate: moment(fromDate).format("DD-MM-YYYY"),
      toDate: moment(toDate).format("DD-MM-YYYY"),
      userid: userid,
      status: booking.status,
    });

    await roomtemp.save();

    res.send("Room booked successfully!");
  } catch (e) {
    return res.status(400).json({ e });
  }
});

module.exports = router;
