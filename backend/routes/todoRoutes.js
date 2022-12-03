const express = require("express");
const todo = express.Router();
const {
  getTodos,
  addTodo,
  deleteTodo,
  editTodo,
} = require("../controllers/todoContoller");

todo.route("/").get(getTodos).post(addTodo).delete(deleteTodo).put(editTodo);

module.exports = { todo };
