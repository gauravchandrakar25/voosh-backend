import { Request, Response } from "express";
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, "uploads/profile_images");
  },
  filename: function (req: Request, file: any, cb: any) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

interface MulterRequest extends Request {
  file: any;
}

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

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (existingUser.user_type === "admin") {
      const privateUser = await User.find({ profile_type: "private" });
      const publicUser = await User.find({ profile_type: "public" });

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
      const profileType = await User.find({ profile_type: "public" });

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
    const {
      name,
      bio,
      phone,
      email,
      password,
      new_password,
      new_email,
      profile_type,
    } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    const updateUser = await User.findOneAndUpdate(
      { email: email },
      {
        name: name,
        bio: bio,
        phone: phone,
        email: new_email,
        password: hashedPassword,
        profile_type: profile_type,
      }
    );
    if (updateUser) {
      return res
        .status(200)
        .json({ message: "User's details updated successfully" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const profilePicture = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const imageBuffer = (req as MulterRequest).file.buffer;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.profile_img = imageBuffer;

    await user.save();

    res.status(200).json({ msg: "Profile image updated successfully" });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { userProfile, userUpdate, profilePicture };
