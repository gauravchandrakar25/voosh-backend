import express from "express";
const router = express.Router();
const { userRegistration, userLogin } = require("../controller/user");
const { userProfile, userUpdate } = require("../controller/user_details");
const passport = require("passport");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/** POST Methods */
/**
 * @openapi
 * '/user/registration':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *              - phone
 *              - confirmPassword
 *              - name
 *              - profile_type
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *              phone:
 *                type: string
 *                default: 7415875875
 *              confirmPassword:
 *                type: string
 *                default: johnDoe20!@
 *              name:
 *                type: string
 *                default: John Doe
 *              profile_type:
 *                type: string
 *                default: public
 *     responses:
 *      200:
 *        description: Created
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server Error
 */

/**
 * @openapi
 * '/user/login':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: invalid credentials
 *      500:
 *        description: Server Error
 */

/**
 * @openapi
 * '/user/login':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: invalid credentials
 *      500:
 *        description: Server Error
 */

/**
 * @openapi
 * '/user/profile':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Get user profile details, login via admin user to view private profiles as well
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: invalid credentials
 *      500:
 *        description: Server Error
 */

/**
 * @openapi
 * '/user/update':
 *  patch:
 *     tags:
 *     - User Controller
 *     summary: Update user details
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - bio
 *              - phone
 *              - email
 *              - password
 *              - new_password
 *              - new_email
 *              - profile_type
 *            properties:
 *              name:
 *                type: string
 *                default: John Doe
 *              bio:
 *                type: string
 *                default: John Doe
 *              phone:
 *                type: string
 *                default: 7415875875
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *              new_password:
 *                type: string
 *                default: johnDoe20!@
 *              new_email:
 *                type: string
 *                default: johndoe@mail.com
 *              profile_type:
 *                type: string
 *                default: private
 *     responses:
 *      200:
 *        description: Created
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server Error
 */

router.post("/user/registration", userRegistration);
router.post("/user/login", userLogin);
router.post("/user/profile", userProfile);
router.patch("/user/update", userUpdate);

module.exports = router;
