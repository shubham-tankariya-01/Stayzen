const express = require("express");
const router = express.Router();
const Listing = require("../Models/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/xpressError.js");
const { listingSchema} = require("../schema.js");
const { IsLoggedIn } = require("../middleware.js");

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
router.get(
  "/",
  wrapAsync(async (req, res) => {
    let allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
  }),
);

//get a form for adding a new listing(Create route)
router.get("/new",IsLoggedIn,(req, res) => {
  res.render("listings/new.ejs");
});

//Get a detailed view of any listing(View Route)
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let Uid = req.params.id;
    const listing = await Listing.findById(Uid).populate({path : "reviews" , populate : {path : "author"}}).populate("owner");
    if(!listing){
    req.flash("Failure" , "Listing not found");
    res.redirect("/listings");
    }else{
    res.render("listings/show.ejs", { listing });
    }
  }),
);


//request(Post) for adding a new Listing
router.post(
  "/",
  IsLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    let NewListing = new Listing(req.body.listing);
    NewListing.owner = req.user._id;
    await NewListing.save();
    req.flash("success" , "New listing Created");
    res.redirect("/listings");
  }),
);

//Get a form for edit any listing(edit route)
router.get(
  "/:id/edit",IsLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
    req.flash("Failure" , "Listing not found");
    res.redirect("/listings");
    }else{
    res.render("listings/edit.ejs", { listing });
    }
    
  }),
);

//Request for save edited changes for listing
router.put(
  "/:id",IsLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await findById(id);
    if(listing.owner._id === req.user._id){

    }
    req.flash("success" , "Listing Updated");
    res.redirect(`/listings/${id}`);
  }),
);

//for deleting any listing
router.delete(
  "/:id",IsLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
     await Listing.findByIdAndDelete(id);
    req.flash("success" , "Listing Deleted");
    res.redirect("/listings");
  }),
);

module.exports = router;
