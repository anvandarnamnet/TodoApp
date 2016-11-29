var express = require("express");
var router = express.Router();
var todo = require("./todos");
var user = "oskar";

var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];


router.get("/", function(req, res, next){
  var query = todo.find({user: user});

  query.exec(function(err, todos){
      if(err){
        return console.log(err);
      }

      res.render("index", {quot: todos});
  });


});


router.get("/addtodo", function(req, res, next){
    res.render("addtodo");
});

router.post("/addtodo", function(req, res, next){

  var description = req.body.desc;
  var date = req.body.date;


  var newTodo = new todo({
    description: description,
    date: date,
    user: "oskar"
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

router.get("/delete-todo/:id", function(req, res, next){
  todo.remove({_id: req.params.id}, function(err){
    console.log("sucess!");
  });
  console.log(req.params.id)
    res.redirect("/");
});

router.get("/mark-done/:id", function(req, res, next){
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


module.exports = router;
