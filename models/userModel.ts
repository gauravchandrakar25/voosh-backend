import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_type: {
    type: String,
    required: true,
  },
  profile_img: {
    type: String,
    required: false,
    default: "",
  },
  bio: {
    type: String,
    required: false,
    default: "",
  },
  user_type: {
    type: String,
    required: false,
    default: "normal_user",
  },
  phone: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
