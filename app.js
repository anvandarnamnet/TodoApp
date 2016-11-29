// The imported requirements
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
var session = require("express-session");
var flash = require("connect-flash")
var cookieparser = require("cookie-parser")
var setUpPassport = require(__dirname + "/setUpPassport");
var routes = require("./routes");
var app = express();
var passport = require("passport")

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://oskar:oskar@ds041432.mlab.com:41432/todolistapps");
setUpPassport();

app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieparser());
app.use(session({
  secret:"TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
  resave: true,
  saveUninitialized: true
}));
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(routes);

app.listen(app.get("port"), function(){
    console.log("Lets go server!");
})
