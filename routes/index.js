var express= require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

// root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
    res.render("register");
});

// signup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        } else {
            passport.authenticate("local")(req,res, function(){
                req.flash("success", "Welcome to BestHikes BC "+ user.username);
                res.redirect("/hikes");
            });
        }
    });
});

// show login form
router.get("/login", function(req, res){
    res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/hikes",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You have been successfully logged out");
    res.redirect("/hikes");
});

module.exports = router;
