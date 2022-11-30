// >Importing express for server
const express = require("express");
const app = express();

// >Importing dotenv for safegaurding the port server
const dotenv = require("dotenv");

const connectDB = require("./config/db");
dotenv.config();
connectDB();

//> To get reslove from the destructing the json data form req.body we need to use
app.use(express.json());

//> Importing router from the routes folder
const userRoutes = require("./routes/userRoute");

const notes = require("./data/notes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.get("/api/notes", (req, res) => {
  res.send(notes);
});

app.use("/api/users", userRoutes);

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
console.log("PORT:", process.env.PORT);

app.listen(PORT, () => {
  console.log(`Server Runs in Port ${PORT}`);
});
