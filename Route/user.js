const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const usercontroller=require("../controler/user.js")

/* Signup Form */
router.get("/signup", usercontroller.signupFormUser);

/* Signup Logic */
router.post("/signup", usercontroller.signupLogicUser);

/* Login Form */
router.get("/login", usercontroller.loginFormUser);

/* Login Logic */
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
 usercontroller.loginLogicUser
);

/* Logout */
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged you out");
    res.redirect("/listing");
  });
});

module.exports = router;