const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/xpressError.js");
const { reviewSchema } = require("../schema.js");
const { IsLoggedIn, IsAuthor } = require("../middleware.js");
const reviewController = require('../controllers/reviews.js');

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
router.post("/", IsLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//deleting reviews
router.delete("/:reviewId", IsAuthor, reviewController.destroyReview);


module.exports = router;