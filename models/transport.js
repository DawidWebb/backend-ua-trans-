const mongoose = require("mongoose");
const { Schema } = mongoose;

const transportSchema = new Schema({
  userId: { type: String },
  loadCity: { type: String },
  delCity: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  kindOfTruck: { type: String },
  weight: { type: Number },
  package: { type: String },
  quanity: { type: Number },
  describe: { type: String },
  contact: { type: String },
  kindOfTransport: { type: String },
});

module.exports = mongoose.model("Transport", transportSchema);
