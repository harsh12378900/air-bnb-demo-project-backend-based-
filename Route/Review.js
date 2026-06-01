let express=require("express");
let router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const listing=require("../models/listening.js");
const reviews=require("../models/Reviews.js");
const { isLoggedIn,isReviewAuthor } = require("../middleware.js");
const reviewcontroller=require("../controler/reviews.js");

// review ka 
 //Post route

 router.post("/listing/:id/reviews",isLoggedIn,wrapAsync(reviewcontroller.postreview))

 // DELETE REVIEW ROUTE

 router.delete("/listing/:id/reviews/:reviewId", isLoggedIn,isReviewAuthor,reviewcontroller.deletereview);

  module.exports=router;