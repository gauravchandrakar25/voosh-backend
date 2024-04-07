import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const userRegistration = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, confirmPassword, profile_type } =
      req.body;

    if (!name) {
      res.status(400).json({ error: "Please enter user name" });
    }

    if (!profile_type) {
      res.status(400).json({ error: "Please enter a valid user type" });
    }

    if (!email) {
      res.status(400).json({ error: "Please enter a valid email" });
    }
    if (!password) {
      res.status(400).json({ error: "Please enter password" });
    }
    if (!phone) {
      res.status(400).json({ error: "Please enter ypur phone no." });
    }
    if (!confirmPassword) {
      res.status(400).json({ error: "Please confirm your password" });
    }

    if (confirmPassword != password) {
      res.status(400).json({
        error: "Password doesn't match, please re-enter your password",
      });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User(req.body);
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).json({ error: "Please enter a valid email" });
    }

    if (!password) {
      res.status(400).json({ error: "Please enter password" });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (error: any, token: any) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { userRegistration, userLogin };
