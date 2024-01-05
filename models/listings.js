const mongoose = require("mongoose");
//const schema = mongoose.Schema;
const mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Review = require("./reviews");
const User = require("./users");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: {
      type:String
    },
    filename: {
      type:String
    }
  },
  price: Number,
  location: String,
  country: String,
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Review"
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});
listingSchema.post('findOneAndDelete', async(listing)=>{
  await Review.deleteMany({ _id: { $in: listing.reviews } });
  // console.log("deleted reviews associated with listing");
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
