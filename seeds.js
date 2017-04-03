var mongoose = require("mongoose");
var Hike = require("./models/hike");
var Comment = require("./models/comment");
var data = require("./seedData");

function seedDB (){
    // remove all campgrounds
    Hike.remove({}, function(err){
        if (err){
            console.log(err);
        } else {
            console.log("removed hikes!");
            // add a few hikess
            data.forEach(function(seed){
                Hike.create(seed, function(err, hike){
                    if(err){
                        console.log(err);
                    } else {
                        // add comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: {
                                  id: "58af4090f3c04337d13d87f1",
                                  username: "Adam"
                                }

                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    hike.comments.push(comment);
                                    hike.save();
                                }
                            }
                        );

                    }
                });
            });
            console.log("Done seeding...");
        }
    });
}

module.exports = seedDB;
