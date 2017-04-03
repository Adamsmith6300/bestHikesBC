var express= require("express");
var router = express.Router();
var Hike = require("../models/hike");
var middleware = require("../middleware");

// shows all campgrounds
router.get("/", function(req, res){
    Hike.find({}, function(err, allHikes){
        if(err){
            console.log(err);
        } else {
            res.render("hikes/index", {hikes: allHikes});
        }
    });
});

// routes post request for creating new campground
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var duration = req.body.duration;
    var desc = req.body.description;
    var dir = req.body.directions;
    var location = req.body.location;
    var region = req.body.region;
    var amen = req.body.amenities;
    var length = req.body.length;
    var elevation = req.body.elevation;
    var difficulty = req.body.difficulty;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newHike = {name: name, image: image, duration: duration, description: desc, directions: dir, location: location, region: region, amenities: amen, length: length, elevation: elevation, difficulty: difficulty, author: author};
    req.body.hike.body = req.sanitize(req.body.hike.body);
    Hike.create(newHike, function(err, newlyCreated){
        if (err){
            console.log(err);
        } else {
            res.redirect("/hikes");
        }
    });
});

// shows page for creating new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("hikes/new");
});

// shows more info about one campground
router.get("/:id", function(req, res){
    // find campground with provided id
    Hike.findById(req.params.id).populate("comments").exec(function(err, foundHike){
        if(err){
            console.log(err);
        } else {
            // render show template and pass through that campground as a variable
            res.render("hikes/show", {hike: foundHike});
        }
    });

});

// edit campground
router.get("/:id/edit", middleware.checkHikeOwnership, function(req, res){
    Hike.findById(req.params.id, function(err, foundHike){
        res.render("hikes/edit", {hike: foundHike});
    });

});

// update campground
router.put("/:id", middleware.checkHikeOwnership, function(req, res){
    req.body.hike.body = req.sanitize(req.body.hike.body);
    Hike.findByIdAndUpdate(req.params.id, req.body.hike, function(err, updatedHike){
        if(err){
            res.redirect("/hikes");
        } else {
            res.redirect("/hikes/" + req.params.id);
        }
    });
});

// destroy route
router.delete("/:id", middleware.checkHikeOwnership, function(req, res){
    Hike.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/hikes");
        } else {
            res.redirect("/hikes");
        }
    });
});

module.exports = router;
