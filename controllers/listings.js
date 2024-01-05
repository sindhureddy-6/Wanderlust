require('dotenv').config();
const Listing = require("../models/listings.js");
const User = require("../models/users.js");
const AsyncWrap = require("../utils/AsyncWrap.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAP_API_KEY });


module.exports.allListings = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/home.ejs", { allListings });
};
module.exports.createListingGet = (req, res) => {
    res.render("listings/new.ejs");
};
module.exports.createListingPost = AsyncWrap(async (req, res) => {
    //console.log(req.body);
    let response = await geocodingClient.forwardGeocode({
        query: req.body.location,
        limit: 1
    }).send();
    // console.log(response.body.features[0]);
    const newListing = new Listing(req.body);
    let url = req.file.path;
    let filename = req.file.filename;
    newListing.image = { url, filename }
    newListing.owner = req.user._id;
    newListing.geometry = response.body.features[0].geometry;
    await newListing.save();
    req.flash("success", "Added Listing Sucessfully!");
    res.redirect("/listings");
});
module.exports.showListing = AsyncWrap(async (req, res) => {
    let id = req.params.id;
    // console.log("show id",id);
    let listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "createdBy"
            },
        }).populate('owner');
    // console.log(listing);
    if (!listing) {
        req.flash("error", "listing is not found!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
});
module.exports.editListingGet = AsyncWrap(async (req, res) => {
    let id = req.params.id;
   
    let listing = await Listing.findById(id);
    // console.log(listing);
    if (!listing) {
        req.flash("error", "listing your are trying to edit is not found!");
        res.redirect("/listings");
        
    }
    res.render("listings/edit.ejs", { listing });
});
module.exports.editListingPut = AsyncWrap(async (req, res) => {
    let id = req.params.id;
    let updatedListing = req.body;
    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = { url, filename }
    }
    await Listing.findByIdAndUpdate(id, updatedListing);
    req.flash("success", "Listing Edited Sucessfully!");
    res.redirect(`/listings/${id}`);

});
module.exports.deleteListing = AsyncWrap(async (req, res) => {
    let id = req.params.id;
    await Listing.findByIdAndDelete(id);
    req.flash("success", " Listing Deleted!");
    res.redirect("/listings");
});