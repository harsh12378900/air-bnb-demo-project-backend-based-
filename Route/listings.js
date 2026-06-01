const express = require("express");
const route = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const listing = require("../models/listening.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn } = require("../middleware.js");
const listingcontroller=require("../controler/listings.js");
// app.use(express.urlencoded({ extended: true }));
const multer  = require('multer')




const {storage}=require("../cloudConfig.js");
const upload = multer({ storage })
// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 } // 5MB
// });

// INDEX
route.get(
  "/",
  wrapAsync(listingcontroller.index)
);

// NEW
route.get("/new", isLoggedIn,listingcontroller.newlisting );

// SHOW
route.get(
  "/:id",
  wrapAsync(listingcontroller.showlisting)
);

// CREATE
// route.post(
//   "/",
//   
// );

route.post(
  "/",upload.single('image'),
  wrapAsync(listingcontroller.createlisting)
);



// EDIT
route.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(listingcontroller.editlisting)
);

// UPDATE
route.put(
  "/:id",
  wrapAsync(listingcontroller.updatelisting)
);

// DELETE
route.delete(
  "/:id",
  isLoggedIn,
  wrapAsync(listingcontroller.destroylisting)
);


module.exports = route;