const { TodoModel } = require("../models/todoModel");

const searchControl = async (req, res) => {
  try {
    const { userid, query } = req.query;
    const todos = await TodoModel.find({ userid });
    const result = todos.filter((e) => {
      return e.title.includes(query) || e.tasks.includes(query);
    });
    return res.status(200).json(result);
  } catch {
    res.status(500).json({ status: 500, message: "something went wrong" });
  }
};

module.exports = { searchControl };
