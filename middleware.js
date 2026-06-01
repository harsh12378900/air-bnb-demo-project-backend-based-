const Reviews = require("./models/Reviews");

const isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please login first");
  req.session.redirectUrl = req.originalUrl;
  res.redirect("/login");
};

const saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
async function isReviewAuthor(req, res, next) {
  let { id, reviewId } = req.params;

  let review = await Reviews.findById(reviewId);

  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You are not the author");
    return res.redirect(`/listing/${id}`);
  }

  next();
}

module.exports = {
  isLoggedIn,
  saveRedirectUrl,
  isReviewAuthor
};