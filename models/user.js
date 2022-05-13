const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phone: Number,
  email: String,
  country: String,
  state: String,
  city: String,
  position: String,
  technology: Array,
  password: String,
  gender: String,
});
module.exports = mongoose.model("User", userSchema);
