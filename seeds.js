var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
            {
                name: "Orange Sundown",
                image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget pharetra augue, sit amet cursus ligula. Mauris nec nisi eget massa congue luctus. Pellentesque mauris tellus, semper tincidunt eros eu, semper accumsan magna. Sed congue dolor vel velit gravida imperdiet. Vestibulum maximus enim quis mauris commodo tristique. Ut imperdiet felis turpis. Pellentesque a metus urna. Donec vel felis dui."
            },
            {
                name: "Beach Bay",
                image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget pharetra augue, sit amet cursus ligula. Mauris nec nisi eget massa congue luctus. Pellentesque mauris tellus, semper tincidunt eros eu, semper accumsan magna. Sed congue dolor vel velit gravida imperdiet. Vestibulum maximus enim quis mauris commodo tristique. Ut imperdiet felis turpis. Pellentesque a metus urna. Donec vel felis dui."
            }, 
            {
                name: "George Gulley",
                image: "https://farm9.staticflickr.com/8309/7968772438_3e0935fab7.jpg",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget pharetra augue, sit amet cursus ligula. Mauris nec nisi eget massa congue luctus. Pellentesque mauris tellus, semper tincidunt eros eu, semper accumsan magna. Sed congue dolor vel velit gravida imperdiet. Vestibulum maximus enim quis mauris commodo tristique. Ut imperdiet felis turpis. Pellentesque a metus urna. Donec vel felis dui."
            }


]

function seedDB (){
    // remove all campgrounds
    Campground.remove({}, function(err){
    //     if (err){
    //         console.log(err);
    //     } else {
    //         console.log("removed campgrounds!");
    //         // add a few campgrounds
    //         data.forEach(function(seed){
    //             Campground.create(seed, function(err, campground){
    //                 if(err){
    //                     console.log(err);
    //                 } else {
    //                     console.log("added a campground");
    //                     // add comment
    //                     Comment.create(
    //                         {
    //                             text: "This place is great, but I wish there was internet",
    //                             author: "Homer"
    //                         }, function(err, comment){
    //                             if(err){
    //                                 console.log(err);
    //                             } else {
    //                                 campground.comments.push(comment);
    //                                 campground.save();
    //                                 console.log("created new comment");
    //                             }
    //                         }
    //                     );
                        
    //                 }
    //             });
    //         });
    //     }
    });
}

module.exports = seedDB;
