require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listingsRoute = require("./routes/listings");
const reviewsRoute = require("./routes/reviews");
const usersRoute=require("./routes/users")
const session = require("express-session");
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require("./models/users");
const MongoStore = require('connect-mongo');
const dbUrl = process.env.MONGO_DB_URL;
main().then(() => {
    console.log("connected succesfully");
}).catch((err) => {
    console.log(err);
})

 async function main() {
     await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on((err) => {
    console.log("error in mongo session store", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    },
    
}
// app.get("/", (req, res) => {
//     res.send("Hi, I am root");
// });

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});

app.use("/", usersRoute);
app.use("/listings", listingsRoute);
app.use("/listings/:id/reviews", reviewsRoute);

app.all("*", (req, res, next) => {
    next(new ExpressError(400, "Page not Found"));
});
app.use((err, req, res, next) => {
  // console.log(err);
    let { status = 500, message = "internal server Error" } = err;
    res.status(status).render("listings/err.ejs", { message });
})
app.listen(3000, (req, res) => {
    
    console.log("app is listening");
})