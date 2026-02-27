const express = require("express");
const router = express.Router();
const Listing = require("../Models/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/xpressError.js");
const { listingSchema } = require("../schema.js");
const { IsLoggedIn, IsOwner } = require("../middleware.js");
const listingsController = require("../controllers/listings.js")


const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//Show all listings
router.get("/", wrapAsync(listingsController.index));

//get a form for adding a new listing(Create route)
router.get("/new", IsLoggedIn, listingsController.createListing);

//Get a detailed view of any listing(View Route)
router.get(
  "/:id",
  wrapAsync(listingsController.viewListing),
);


//request(Post) for adding a new Listing
router.post(
  "/",
  IsLoggedIn,
  validateListing,
  wrapAsync(listingsController.createListing),
);

//Get a form for edit any listing(edit route)
router.get(
  "/:id/edit", IsLoggedIn, IsOwner,
  wrapAsync(listingsController.editListingForm),
);

//Request for save edited changes for listing
router.put(
  "/:id", IsLoggedIn, IsOwner,
  validateListing,
  wrapAsync(listingsController.editListing),
);

//for deleting any listing
router.delete(
  "/:id", IsLoggedIn, IsOwner,
  wrapAsync(listingsController.destroyListing),
);

module.exports = router;
