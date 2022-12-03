const sdk = require("node-appwrite");

const express = require("express");
const auth = express.Router();

const client = new sdk.Client()
  .setEndpoint(process.env.APPWRITE_API)
  .setProject(process.env.APPWRITE_PROJECT_ID);

auth.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const account = new sdk.Account(client);

  try {
    const createUser = await users.createBcryptUser(username, email, password);
    res.status(200).json(createUser);
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error,
    });
  }
});

module.exports = auth;
