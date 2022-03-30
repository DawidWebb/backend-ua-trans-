const mongoose = require("mongoose");
const { Schema } = mongoose;

const loginSchema = new Schema({
  login: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: Buffer, required: true },
  access: { type: String, required: true },
  rodo: { type: Boolean, required: true },
  conditions: { type: Boolean, required: true },
  dateOfAdd: { type: String },
  active: { type: Boolean },
  postsIdForComments: { type: Array },
  postsIdForLikes: { type: Array },
});

module.exports = mongoose.model("Login", loginSchema);
