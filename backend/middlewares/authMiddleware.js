const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //> this req.user will use full to fetch the realted data to the particular user

      req.user = await User.findById(decoded.id).select("-password");
      
      console.log('  req.user:',   req.user)

      next();


    } catch (error) {
      res.status(401);

      throw new Error("Not authorized, token failed");
    }
  }

  if(!token){
    res.status(401);
    throw new Error("Not authorized, token Empty");
  }
});


module.exports ={protect}