require("dotenv").config();
const express = require("express");
const { todo } = require("./routes/todoRoutes");
const { task } = require("./routes/taskRoutes");
const { search } = require("./routes/searchRoute");
const auth = require("./routes/authRoute");

require("./config/database").connectDB(); //Connecting Database

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // URL Encoding option

app.use("/todo", todo);

app.use("/task", task);

app.use("/search", search);

app.use("/", auth);

app.listen(process.env.PORT, () => {
  console.log("Server started successfully on port:", process.env.PORT);
});
