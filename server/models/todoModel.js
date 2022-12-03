const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    userid: {
      type: String,
      required: [true, "User id is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    tasks: [String],
  },
  { timestamps: true }
);

const TodoModel = mongoose.model("Todo", TodoSchema);

module.exports = { TodoModel };
