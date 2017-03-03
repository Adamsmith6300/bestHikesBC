var mongoose        = require("mongoose");

var hikeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    directions: String,
    location: String,
    amenities: String,
    duration: Number,
    length: Number,
    elevation: Number,
    difficulty: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }


    ]
});

module.exports = mongoose.model("Hike", hikeSchema);
