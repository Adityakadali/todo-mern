const { TodoModel } = require("../models/todoModel");

// Method

const createTask = async (req, res) => {
  try {
    const { id, task } = req.body;

    if (!(id || task)) {
      return res.status(400).json({
        status: 400,
        message: "Task cannot be empty",
      });
    }

    const todo = await TodoModel.findById(id).exec();

    if (!todo) {
      return res.status(404).json({
        status: 404,
        message: "Invalid id",
      });
    }

    todo.tasks.push(task);
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id, key } = req.body;
    const todo = await TodoModel.findById(id).exec();

    if (!todo) {
      return res.status(404).json({
        status: 404,
        message: "Invalid id",
      });
    }

    todo.tasks.splice(key, 1);
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
    console.log(error);
  }
};

const edittask = async (req, res) => {
  try {
    const { id, key, newTask } = req.body;
    const todo = await TodoModel.findById(id).exec();

    if (!todo) {
      return res.status(404).json({
        status: 404,
        message: "Invalid id",
      });
    }

    todo.tasks[key] = newTask;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
    console.log(error);
  }
};

module.exports = { createTask, deleteTask, edittask };
