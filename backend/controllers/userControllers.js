const asyncHandler = require("express-async-handler");
//> User is created form user Schema model by mongoose
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

//> Signup

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);

    throw new Error("User Alreay Exists");
  }

  const user = await User.create({ name, email, password, pic });
  console.log("user:", user);

  // const user = new User({ name, email, password, pic });
  // await user.save();

  //>   save() is used for storing the data in database using mongoose

  if (user) {
    res.status(201).send({ user, token: generateToken(user._id) });
  } else {
    res.status(400);
    throw new Error("Error in creating user");
  }

  res.json({
    name,
    email,
  });
});

//> Login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("email:", email);

  const user = await User.findOne({ email });

  console.log("user:", user);

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({ user, token: generateToken(user._id) });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;

    user.email = req.body.email || user.email;

    user.pic = req.body.pic || user.pic;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({ _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, pic: updatedUser.pic, token: generateToken(updatedUser._id) });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { registerUser, authUser, updateUserProfile };
