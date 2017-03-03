var express= require("express");
var router = express.Router({mergeParams: true});
var Hike = require("../models/hike");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// show create new comment page
router.get("/new", middleware.isLoggedIn, function(req, res){
   Hike.findById(req.params.id, function(err, hike){
       if(err){
           console.log(err);
       } else {
           res.render("comments/new", {hike: hike});
       }
   });
});

// create new comment request
router.post("/", middleware.isLoggedIn, function(req, res){
    Hike.findById(req.params.id, function(err, hike){
        if (err){
            console.log(err);
            res.redirect("/hikes");
        } else {
            req.body.comment.body = req.sanitize(req.body.comment.body);
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save();
                    hike.comments.push(comment);
                    hike.save();
                    req.flash("success", "Successfully added comment!");
                    res.redirect("/hikes/" + hike._id);
                }
            });
        }
    });
});

// edit comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {comment: foundComment, hike_id: req.params.id});
        }
    });
});

// update comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    req.body.comment.body = req.sanitize(req.body.comment.body);
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/hikes/" + req.params.id);
        }
    });
});

// destroy comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("/hikes/" + req.params.id);
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/hikes/" + req.params.id);
        }
    });
});

module.exports = router;
