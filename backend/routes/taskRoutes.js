const express = require("express");

const task = express.Router();

const {
  createTask,
  deleteTask,
  edittask,
} = require("../controllers/taskController");

task.route("/").post(createTask).delete(deleteTask).put(edittask);

module.exports = { task };
