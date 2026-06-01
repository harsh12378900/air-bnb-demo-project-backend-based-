if(process.env.NODE_ENV!= "production"){
  require('dotenv').config() // or import 'dotenv/config' if you're using ES
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");

const ExpressError = require("./utils/ExpressError.js");

// Routes
const listingRoute = require("./Route/listings.js");
const reviewRoute = require("./Route/Review.js");
const userRoute = require("./Route/user.js");

// Model
const User = require("./models/user.js");

const app = express();

/* ===================== BASIC SETUP ===================== */

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/uploads", express.static("uploads"));

/* ===================== DATABASE ===================== */

const dbUrl=process.env.ATLASDB_URL;

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((err) => {
    console.log(err);
  });



/* ===================== SESSION ===================== */
const store= MongoStore.create({
  mongoUrl: dbUrl,
  crypto:{
    secret: process.env.MY_SECRET
  },
  touchAfter:24*3600,
});
store.on("error", (err) => {
  console.error("Mongo Store Error:", err);
});
app.use(
  session({
    store: store,
    secret: process.env.MY_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);

app.use(flash());

/* ===================== PASSPORT ===================== */

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* ===================== LOCALS (FLASH) ===================== */

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

/* ===================== ROUTES ===================== */

app.use("/listing", listingRoute);
app.use("/", reviewRoute);
app.use("/", userRoute);

app.get("/", (req, res) => {
  res.redirect("/listing");
});

/* ===================== DEMO USER ===================== */

app.get("/demouser", async (req, res) => {
  try {
    const fakeUser = new User({
      username: "harshit",
      email: "harshit1234@gmail.com",
    });

    const registeredUser = await User.register(fakeUser, "helloworld");
    res.send(registeredUser);
  } catch (err) {
    res.send(err.message);
  }
});

/* ===================== ERROR HANDLER ===================== */

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("listings/alert.ejs", { message });
});

/* ===================== SERVER ===================== */

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});