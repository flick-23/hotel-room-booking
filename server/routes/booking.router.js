const express = require("express");
const router = express.Router();
const moment = require("moment");
const Room = require("../models/room.model");
const { v4: uuidv4 } = require("uuid");
const Booking = require("../models/booking.model");
const stripe = require("stripe")(
  "sk_test_51LDTa1SGuzP037r7APoJufNRf1DIg255DCEkbWpzxpeJnKKLVuKWRcLED8KzW4LTAE5BJtfchxalOWyGeTntBvhf00RE9wNJ78"
);

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromDate, toDate, totalAmount, totalDays, token } =
    req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      customer: customer.id,
      currency: "inr",
      receipt_email: token.email,
    });
    if (paymentIntent) {
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
    }
    res.send("Payment successfull, Room is booked!");
  } catch (e) {
    return res.status(400).json({ e });
  }
});

module.exports = router;
