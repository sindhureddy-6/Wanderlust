const Listing = require("../models/listings");
const Review = require("../models/reviews.js");
const AsyncWrap = require("../utils/AsyncWrap.js");
module.exports.addReview = AsyncWrap(async (req, res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    //console.log("review given", req.body);
    let review = new Review(req.body);
    review.createdBy = req.user._id;
    // console.log(review);
    listing.reviews.push(review);
    let r = await review.save();
    // console.log("review", r);
    await listing.save();
    req.flash("success", "Review added successfully!");
    res.redirect(`/listings/${id}`);
});
module.exports.deleteReview = async (req, res) => {
    //   console.log("Reached delete route");
    let id = req.params.id;
    let reviewId = req.params.reviewId;
    //   console.log("ID:", id, "Review ID:", reviewId);
    let review = await Review.findById(reviewId);
    if (!review.createdBy._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "you dont have permission to delete the review");
        return res.redirect(`/listings/${id}`);
    }
    await Review.findByIdAndDelete(reviewId);
    // console.log("Review is deleted");
    let listing = await Listing.findById(id);
    await Listing.updateOne(
        { _id: id },
        {
            $pull: {
                reviewId: { $in: listing.reviews }
            }
        }
    );
    // console.log("review in listing deleted");
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};