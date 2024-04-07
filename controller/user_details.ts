import { Request, Response } from "express";
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const userProfile = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).json({ error: "Please enter a valid email" });
    }
    if (!password) {
      res.status(400).json({ error: "Please enter password" });
    }

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exists" });
    }

    console.log("--------------------------------");
    console.log(existingUser);
    console.log("--------------------------------");

    if (existingUser.user_type === "admin") {
      const privateUser = await User.findAll({ profile_type: "private" });
      const publicUser = await User.findAll({ profile_type: "public" });

      res.status(200).json({
        message: "Admin user",
        userProfile: {
          profile_type: existingUser.profile_type,
          name: existingUser.name,
          public_user: [publicUser],
          private_user: [privateUser],
        },
      });
    } else {
      const profileType = await User.findAll({ profile_type: "public" });

      console.log("--------------------------------");
      console.log(profileType);
      console.log("--------------------------------");

      //show all users which are public users
      res.status(200).json({
        message: "User found",
        userProfile: {
          profile_type: existingUser.profile_type,
          name: existingUser.name,
          public_users: [profileType],
        },
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const userUpdate = async (req: Request, res: Response) => {
  try {
    const { name, bio, phone, email, new_password, new_email } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exists" });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    const updateUser = await User.insertMany([
      {
        name: name,
        bio: bio,
        phone: phone,
        email: new_email,
        password: hashedPassword,
      },
    ]);

    if (existingUser) {
      updateUser();
      console.log("--------------------------------");
      console.log(updateUser);
      console.log("--------------------------------");

      return res
        .status(200)
        .json({ message: "User's details updated successfully" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { userProfile, userUpdate };
