const mongoose = require("mongoose");
const { Schema } = mongoose;

const loginSchema = new Schema({
  login: { type: String, required: true },
  name: { type: String, required: true },
  hashPass: { type: String, required: true },
  rodo: { type: Boolean, required: true },
  conditions: { type: Boolean, required: true },
  dateOfAdd: { type: Date },
  active: { type: Boolean },
});

module.exports = mongoose.model("Login", loginSchema);
