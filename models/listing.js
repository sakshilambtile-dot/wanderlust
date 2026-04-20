const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: {
        type: Number,
        required: true,
    },
    location: String,
    country: String,
    category: {
    type: String,
    enum: ["trending", "rooms", "mountains", "castles", "camping", "farms", "arctic"],
    default: "trending"
},
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    category: {
    type: String,
    enum: [
        "trending",
        "rooms",
        "mountains",
        "castles",
        "camping",
        "farms",
        "arctic",
        "domes",
        "boats",
    ],
    
},
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;