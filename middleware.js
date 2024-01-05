const Listing = require("./models/listings");
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectURL = req.originalUrl;
        req.flash("error", "Oops! It seems like you're not logged in. Time to unlock the magic – please log in to access your account.");
        return res.redirect("/login");
    }
    next();
};
module.exports.saveRedirectUrl = (req, res, next) => {
    res.locals.redirectUrl = req.session.redirectURL;
    next();
}
module.exports.isOwner = async(req, res, next) => {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "you are not owner of this listing");
       return res.redirect(`/listings/${id}`);
    }  
    next();
}