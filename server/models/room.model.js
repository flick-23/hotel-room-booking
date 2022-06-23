const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    maxcount: {
      type: Number,
    },
    phonenumber: {
      type: Number,
    },
    rentperday: {
      type: Number,
    },
    imageurls: [],
    currentBookings: [],
    type: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const roomModel = mongoose.model("rooms", roomSchema);

module.exports = roomModel;
