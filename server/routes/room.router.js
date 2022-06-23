const express = require("express");
const router = express.Router();

const Room = require("../models/room.model");

router.get("/getAllRooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.json({ rooms });
  } catch (e) {
    return res.status(400).json({ message: e });
  }
});

router.post("/getRoomsById", async (req, res) => {
  const roomid = req.body.roomid;
  try {
    const room = await Room.findOne({ _id: roomid });
    return res.send(room);
  } catch (e) {
    return res.status(400).json({ message: e });
  }
});

router.post("/addRoom", async (req, res) => {
  try {
    const newroom = new Room(req.body);
    await newroom.save();
    res.send("Room added successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
