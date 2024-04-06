import { Request, Response } from "express";
const jwt = require("jwt");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const userRegistration = async (req: Request, res: Response) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User(req.body);
    newUser.password = await bcrypt.hash(req.body.password, 10);
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { userRegistration };
