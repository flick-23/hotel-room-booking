const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    maxCount: {
      type: Number,
    },
    phoneNumber: {
      type: Number,
    },
    rentPerDay: {
      type: Number,
    },
    imageUrls: [],
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
