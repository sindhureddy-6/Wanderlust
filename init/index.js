const mongoose = require("mongoose");
const Listing = require("../models/listings");
let { data } = require("./data.js");
const mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";
main().then(() => {
    console.log("connected to Database");
}).catch((err) => {
    console.log(err);
})

 async function main(){
     await mongoose.connect(mongo_URL);
}
const init = async() => {
    await Listing.deleteMany({});
    data = data.map((obj) => ({ ...obj, owner: "6592d094a68b1c1b6f384790",reviews:[] }));
    await Listing.insertMany(data);
    console.log("inserted data succesfully");
}
init();