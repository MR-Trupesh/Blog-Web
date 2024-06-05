const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017"),
  {
    useNewConnection: true,
    useUnifiedTopology: true,
  };

const db = mongoose.connection;

db.once("connected", () => {
  console.log("MOngoDB connected");
});

db.once("error", (err) => {
  console.log("MOngoDB connected err!", err);
});

module.exports = db;
