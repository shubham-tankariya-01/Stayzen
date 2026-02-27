const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usersController = require("../controllers/users.js");

// signup page get request
router.get("/signup", usersController.renderSignupForm);

// post request for signup
router.post("/signup", wrapAsync(usersController.signup));

// login page get request
router.get("/login", usersController.renderLoginForm);

// post request for login
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  usersController.login
);

router.get("/logout", usersController.logout);

module.exports = router;
