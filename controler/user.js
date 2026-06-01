const User = require("../models/user.js");

module.exports.signupFormUser=(req, res) => {
    res.render("user/signup.ejs");
  }

  module.exports.signupLogicUser=async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registeruser = await User.register(newUser, password);
  
      req.login(registeruser, function (err) {
        if (err) return next(err);
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listing");
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  }


  module.exports.loginFormUser=(req, res) => {
    res.render("user/login.ejs");
  }
  

  module.exports.loginLogicUser= (req, res) => {
    req.flash("success", "You are logged in successfully!");
    const redirectUrl = res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
  }
  