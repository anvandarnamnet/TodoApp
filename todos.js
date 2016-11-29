var mongoose = require("mongoose");

var todoSchema = mongoose.Schema({
  description: {type: String, required: true},
  date: {type: Date, required: true},
  user: {type: String, required: true},
  done: {type: Boolean, default:false},
  createdAt: {type: Date, default:Date.now}
});

var todo = mongoose.model("todos", todoSchema);
module.exports = todo;
