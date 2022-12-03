const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    title: String,
    tasks: [String],
  },
  { timestamps: true }
);

const TodoModel = mongoose.model("Todo", TodoSchema);

module.exports = { TodoModel };
