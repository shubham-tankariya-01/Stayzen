const Listing = require("../Models/listing.js");

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
  let url = req.file.path;
  let fileName = req.file.filename;
  let NewListing = new Listing(req.body.listing);
  NewListing.owner = req.user._id;
  NewListing.image = { url, fileName }
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
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  // console.log(listing)
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let fileName = req.file.filename;
    listing.image = { url, fileName }
    await listing.save();
  }

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
}

module.exports.search = async (req, res) => {
  let { query } = req.query;
  if (!query) {
    req.flash("error", "Please enter a location to search");
    return res.redirect("/listings");
  }

  // Fuzzy search for location
  let allListings = await Listing.find({
    location: { $regex: query, $options: "i" }
  });

  if (allListings.length === 0) {
    req.flash("error", `No listings found for "${query}"`);
    return res.redirect("/listings");
  }

  res.render("listings/index.ejs", { allListings, query, searchPath: true });
}
