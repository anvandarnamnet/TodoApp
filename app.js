// The imported requirements
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");

//my own stuff
var routes = require("./routes");

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://oskar:oskar@ds149557.mlab.com:49557/oskartestingdata");

app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: false}));

app.use(routes);

app.listen(app.get("port"), function(){
    console.log("Lets go server!");
})
