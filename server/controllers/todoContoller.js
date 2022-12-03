const { TodoModel } = require("../models/todoModel");

// Method GET
// Fetches all Todos in DB
const getTodos = async (req, res) => {
  try {
    const { userid } = req.body;
    const todos = await TodoModel.find({ userid });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

// Method POST
// Adds todo Entry to DB
const addTodo = async (req, res) => {
  try {
    const { userid, title, task } = req.body;
    if (!(title || userid)) {
      return res.status(400).json({
        staus: 400,
        message: "userid or title cannot be empty",
      });
    }
    try {
      const todo = new TodoModel({
        userid: userid,
        title: title,
      });

      console.log(task);

      if (task) JSON.parse(task).forEach((e) => todo.tasks.push(e));

      await todo.save();
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Internal server error",
        erorr: error,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
    console.log(error);
  }
};

// Method GET
// Deletes todo
// From body => id
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.body;
    const todo = await TodoModel.findByIdAndDelete(id).exec();
    if (!todo) {
      return res.status(404).json({
        status: 404,
        message: "Invalid id",
      });
    }
    res.status(200).json({
      status: 200,
      message: "Deleted",
      todo: todo,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
    console.log(error);
  }
};

const editTodo = async (req, res) => {
  try {
    const { id, newTitle } = req.body;
    const todo = await TodoModel.findById(id).exec();
    if (!todo) {
      return res.status(404).json({
        status: 404,
        message: "Invalid id",
      });
    }

    todo.title = newTitle;
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

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
  editTodo,
};
