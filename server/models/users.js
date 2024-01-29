const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
  },
  profilePicture: {
    type: String,
    required: false,
  },
  sub_id: {
    type: String,
    required: false,
  },
  contact_no: {
    type: String,
    required: [true, "Contact no. is Required"],
  },
  email: {
    type: String,
    required: [true, "E-mail is mandatory"],
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  idCardNumber: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
