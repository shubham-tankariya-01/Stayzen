const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/xpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../Models/review.js");
const Listing = require("../Models/listing.js");

//fn for validating review
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//creating reviews
router.post("/", validateReview ,wrapAsync(async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success" , "Review Submitted");
  res.redirect(`/listings/${req.params.id}`);
}));


module.exports = router;