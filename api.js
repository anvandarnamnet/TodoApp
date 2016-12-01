var express = require("express");
var router = express.Router();
var todo = require("./todos");

router.get("/get", function(req,res, next){
  var user = "oskar";
  var query = todo.find({user: user});

  query.exec(function(err, todos) {
      if(err){
        return console.log(err);
      }

      res.json(todos);
  });
});


module.exports = router;
