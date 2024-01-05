const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userControllers = require("../controllers/users");

router.get("/signup", userControllers.showSignup);
router.post("/signup",userControllers.signup);
router.get("/login", userControllers.showLogin);
router.post("/login", saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),userControllers.login)
router.get('/logout', userControllers.logout);

module.exports = router;