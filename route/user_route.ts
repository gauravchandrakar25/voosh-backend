import express from "express";
const router = express.Router();
const { userRegistration, userLogin } = require("../controller/user");
const { userProfile } = require("../controller/user_details");
const passport = require("passport");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.post("/user/registration", userRegistration);
router.post("/user/login", userLogin);
router.post("/user/profile", userProfile);

module.exports = router;
