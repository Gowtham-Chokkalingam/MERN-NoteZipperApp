const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.listen("8080", (req, res) => {
  console.log("Server Runs in Port 8080");
});
