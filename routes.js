var express = require("express");
var router = express.Router();
var todo = require("./todos");
var userr = "oskar";
var User = require(__dirname + "/models/user")
var passport = require("passport");
var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];


router.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error")
  res.locals.infos = req.flash("info")
  next()
})

router.get("/signup", function(req, res, next){
  res.render("signup");
});

router.post("/signup", function(req,res,next){
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({username:username}, function(err, user){
    if(err){
      return next(err)
    }
    if(user){
      req.flash("error", "User already exists");
      return res.redirect("/signup")
    }

    var newUser = new User({
      username:username,
      password:password
    })
    newUser.save(next)
  })
}, passport.authenticate("login", {
  successRedirect:"/",
  failureRedirect: "/signup",
  failureFlash: true
}));

router.get("/login", function(req, res, next){
  res.render("login");
});

router.post("/login", passport.authenticate("login", {
  successRedirect:"/",
  failureRedirect: "/signup",
  failureFlash: true
}))

router.get("/", ensureAuthenticated, function(req, res, next){
  var thisUser = req.user.username;
  var query = todo.find({user: thisUser});
  query.exec(function(err, todos){
      if(err){
        return console.log(err);
      }

      res.render("index", {quot: todos});
  });
});

router.get("/logout", function(req,res){
  req.logout();
  res.redirect("/");
})


router.get("/addtodo", ensureAuthenticated, function(req, res, next){
    res.render("addtodo");
});

router.post("/addtodo", ensureAuthenticated, function(req, res, next){

  var description = req.body.desc;
  var date = req.body.date;
  var thisUser = req.user.username
  var newTodo = new todo({
    description: description,
    date: date,
    user: thisUser
  });

  newTodo.save(function(err){
    if(err){
      console.log(err);
      return err;

    } else{
      console.log("je");

    }
  });

  res.redirect("/");
});



router.get("/delete-todo/:id", ensureAuthenticated, function(req, res, next){
  todo.remove({_id: req.params.id}, function(err){
    console.log("sucess!");
  });
  console.log(req.params.id)
    res.redirect("/");
});

//osakr

router.get("/mark-done/:id", ensureAuthenticated, function(req, res, next){
  var query = todo.find({_id: req.params.id});
  var date;
  var description;

  todo.findOne(query, 'description date', function (err, getTodo) {
  if (err) return handleError(err);

  getTodo.done = true;
  getTodo.save(function(err) {
      if (err)
        console.log('error')
      else{
        console.log('success')
        res.redirect("/");
      }
    });
});
});



function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    next();
  } else{
    req.flash("info", "well, you suck");
    res.redirect("/login")
  }
}



module.exports = router;
