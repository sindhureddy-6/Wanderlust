const User = require("../models/users");
const AsyncWrap = require("../utils/AsyncWrap");
module.exports.showSignup = (req, res) => {
    res.render("./listings/signup");
};
module.exports.signup = AsyncWrap(async (req, res) => {
    // console.log(req.body);
    try {
        let user = new User(req.body);
        let password = req.body.password;
        let registeredUser = await User.register(user, password);
        if (registeredUser) {
            req.login(registeredUser, (err) => {
                if (err) {
                    next(err);
                }
                req.flash("success", "Welcome to WanderLust!!");
                res.redirect("/listings");
                
            })
        }

       
    }
    catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
});
module.exports.showLogin = (req, res) => {
    res.render("./listings/login");
};
module.exports.login = (req, res) => {
    res.locals.currentUser = req.user;
    // console.log(res.locals.currentUser);
    req.flash("success", "Login Successful!");
    let redirectUrl = res.locals.redirectUrl;
    if (redirectUrl) {
        res.redirect(redirectUrl);
    }
    else {
        res.redirect("/listings");
    }
};
module.exports.logout = function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash("success", "Logged Out Successfully!");
        res.redirect('/listings');
    });
};
