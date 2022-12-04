const express = require("express");
const todo = express.Router();
const {
  getTodos,
  addTodo,
  deleteTodo,
  editTodo,
} = require("../controllers/todoContoller");

todo.get("/:userid", getTodos);

todo.route("/").post(addTodo).delete(deleteTodo).put(editTodo);

module.exports = { todo };
