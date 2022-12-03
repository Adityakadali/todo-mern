const express = require("express");
const { searchControl } = require("../controllers/searchController");

const search = express.Router();

search.get("/", searchControl);

module.exports = { search };
