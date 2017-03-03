// SETUP
var express           = require("express"),
    app               = express(),
    bodyParser        = require("body-parser"),
    expressSanitizer  = require("express-sanitizer"),
    mongoose          = require("mongoose"),
    flash             = require("connect-flash"),
    passport          = require("passport"),
    LocalStrategy     = require("passport-local"),
    Hike              = require("./models/hike"),
    Comment           = require("./models/comment"),
    User              = require("./models/user"),
    methodOverride    = require("method-override");
    // seedDB          = require("./seeds");

var commentRoutes       = require("./routes/comments"),
    hikeRoutes          = require("./routes/hikes"),
    indexRoutes         = require("./routes/index");

var url =  DATABASEURL || "mongodb://localhost/best_hikes_bc"
mongoose.connect(url);
// mongoose.connect("mongodb://Adamsmith6300:Adam5561@ds053774.mlab.com:53774/best_hikes_bc");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(flash());
// seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
    secret:"Adam is great",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/hikes/:id/comments", commentRoutes);
app.use("/hikes", hikeRoutes);
app.use(indexRoutes);

app.listen(3000, function(){
    console.log("Server running properly...");
});
