const mongoose = require("mongoose");
const User = require("./users");
const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    comment: {
        type:String
    },
    createdAt: {
        type: Date,
        default:Date.now()
        
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})
module.exports = mongoose.model("Review", reviewSchema);