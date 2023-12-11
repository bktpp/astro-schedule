const mongoose = require("mongoose");

const lanchesSchema = mongoose.Schema({
   flightNumber: {
      type: Number,
      required: true,
   },
   launchDate: {
      type: Date,
      required: true,
   },
   mission: String,
   rocket: String,
});
