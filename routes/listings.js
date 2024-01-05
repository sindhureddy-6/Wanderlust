const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listings");
const User = require("../models/users.js");
const listingSchema = require("../schema.js");
const AsyncWrap = require("../utils/AsyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const ListingController = require("../controllers/listings.js");
const { storage }=require("../cloudConfig.js");
const multer = require('multer');
const upload = multer({ storage });
const mbxClient = require('@mapbox/mapbox-sdk');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding-v6');
const baseClient = mbxClient({ accessToken: process.env.MAP_API_KEY });
const geocodingService = mbxGeocoding(baseClient);

const  listingValidation = (req, res, next) => {
    // console.log("inside handle validation", req.file);
    let listing;
    if (req.file) {
        listing = { ...req.body, image: { url: req.file.path, filename: req.file.filename } };
    }
    listing={...req.body}

    let {error}= listingSchema.validate(listing);
    if (error) {
        const errors = error.details.map((err) => err.message);
        throw new ExpressError(400, errors);
    } else {
        next();
    }
}

//all listings
router.get("/", ListingController.allListings);
//create route
router.get("/new", isLoggedIn, ListingController.createListingGet);
//post route
router.post("/", isLoggedIn, upload.single('image'),listingValidation, ListingController.createListingPost);

//show Individual Listing
router.get("/:id", isLoggedIn, ListingController.showListing);
//edit route
router.get("/edit/:id", isLoggedIn, isOwner, ListingController.editListingGet);
//update route
router.put("/:id",isLoggedIn,isOwner,upload.single('image'),listingValidation, ListingController.editListingPut)
//delete route
router.delete("/:id", isLoggedIn, isOwner, ListingController.deleteListing);
module.exports = router;