import express from "express";
const router = express.Router();
const { userRegistration, userLogin } = require("../controller/user");
const { userProfile, userUpdate } = require("../controller/user_details");
const passport = require("passport");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.post("/user/registration", userRegistration);
router.post("/user/login", userLogin);
router.post("/user/profile", userProfile);
router.patch("/user/update", userUpdate);

module.exports = router;
