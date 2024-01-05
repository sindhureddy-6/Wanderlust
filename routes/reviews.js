const express = require("express");
const router = express.Router({mergeParams:true});
const reviewSchema = require("../reviewSchema.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn } = require("../middleware.js");
const  reviewControllers  = require("../controllers/reviews.js");

const reviewValidation = (req, res, next) => {
  // console.log("inside  validation", req.body);
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    const errors = error.details.map((err) => err.message);
    throw new ExpressError(400, errors);
  } else {
    next();
  }
};
//show
//post route
router.post("/", reviewValidation,isLoggedIn,reviewControllers.addReview);
//delete route
router.delete("/:reviewId",isLoggedIn,reviewControllers.deleteReview);
module.exports = router;