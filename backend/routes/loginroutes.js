const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const loginschema = require("../models/loginschema");
const register = require("../models/registerschema");
const loginroutes = express.Router();






// login using username & password


loginroutes.post("/", async (req, res) => {
  try {
    if (req.body.username && req.body.password) {
      const oldUser = await loginschema.findOne({
        username: req.body.username,    
      });
      if (!oldUser)
        return res
          .status(404)
          .json({
            success: false,
            error: true,
            message: "User doesn't Exist, you have to register",
          });
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        oldUser.password
      );
      if (!isPasswordCorrect)
        return res
          .status(400)
          .json({ success: false, error: true, message: "Incorrect password" });

      const token = jwt.sign(

        {
          userId: oldUser._id,
          userRole: oldUser.role,
          username: oldUser.username,
        },
        "secret_this_should_be_longerr",
        { expiresIn: "1h" }
      );
    //   console.log("token", token);
      return res.status(200).json({
        success: true,
        error: false,
        message: "Login Successful",
        token: token,
        expiresIn: 3600,
        loginId: oldUser._id,
        userRole: oldUser.role,
        username: oldUser.username,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: true,
        message: "All fields are required!",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = loginroutes;
