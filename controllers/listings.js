const Listing = require("../Models/listing");

module.exports.index = async (req, res) => {
  let allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
};

module.exports.viewListing = async (req, res) => {
    let Uid = req.params.id;
    const listing = await Listing.findById(Uid).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
      req.flash("error", "Listing not found");
      res.redirect("/listings");
    } else {
      res.render("listings/show.ejs", { listing });
    }
  }
  module.exports.createListingForm = (req, res) => {
  res.render("listings/new.ejs");
}

  module.exports.createListing = async (req, res) => {
      let NewListing = new Listing(req.body.listing);
      NewListing.owner = req.user._id;
      await NewListing.save();
      req.flash("success", "New listing Created");
      res.redirect("/listings");
    }

module.exports.editListingForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("Failure", "Listing not found");
      res.redirect("/listings");
    } else {
      res.render("listings/edit.ejs", { listing });
    }

  }
  module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
  }

  module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
  }