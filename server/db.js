const mongoose = require("mongoose");

var mongoURL =
  "mongodb+srv://admin:admin@cluster0.sy2j3.mongodb.net/mern-rooms";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("MongoDB Connection Failed!");
});
connection.on("connected", () => {
  console.log("MongoDB looks fine!");
});
