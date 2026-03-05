const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/xpressError.js");
const { listingSchema } = require("../schema.js");
const { IsLoggedIn, IsOwner } = require("../middleware.js");
const listingsController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

router
  .route("/")
  .get(wrapAsync(listingsController.index))
  .post(
    IsLoggedIn,
    validateListing,
    upload.single("listing[image][url]"),
    wrapAsync(listingsController.createListing),
  );

//get a form for adding a new listing(Create route)
router.get("/new", IsLoggedIn, listingsController.createListingForm);

// Search route (MUST be above /:id)
router.get("/search", wrapAsync(listingsController.search));

router
  .route("/:id")
  .get(wrapAsync(listingsController.viewListing))
  .put(
    IsLoggedIn,
    IsOwner,
    validateListing,
    upload.single("listing[image][url]"),
    wrapAsync(listingsController.editListing),
  )
  .delete(IsLoggedIn, IsOwner, wrapAsync(listingsController.destroyListing));

//Get a form for edit any listing(edit route)
router.get(
  "/:id/edit",
  IsLoggedIn,
  IsOwner,
  wrapAsync(listingsController.editListingForm),
);


module.exports = router;
