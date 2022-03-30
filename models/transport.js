const mongoose = require("mongoose");
const { Schema } = mongoose;

const transportSchema = new Schema({
  userId: { type: String },
  loadCity: { type: String },
  delCity: { type: String },
  loadDate: { type: Date },
  delDete: { type: Date },
  kindOfTruck: { type: String },
  weight: { type: Number },
  quanity: { type: Number },
  package: { type: String },
  describe: { type: String },
  kindOfTransport: { type: String },
});

module.exports = mongoose.model("Transport", transportSchema);
