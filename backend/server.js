// >Importing express for server
const express = require("express");
const app = express();

// >Importing dotenv for safegaurding the port server
const dotenv = require("dotenv");
dotenv.config();

const notes = require("./data/notes");

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.get("/api/notes", (req, res) => {
  res.send(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const singleNote = notes.find((n) => n._id === req.params.id);
  res.send(singleNote);
});

const PORT = process.env.PORT || 5000;
console.log("PORT:", process.env.PORT);

app.listen(PORT, (req, res) => {
  console.log(`Server Runs in Port ${PORT}`);
});
