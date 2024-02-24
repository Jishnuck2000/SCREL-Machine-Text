const express = require("express");
const registerroutes = express.Router();
const bcrypt = require("bcryptjs");
const registerDB = require("../models/registerschema");
const loginDB = require("../models/loginschema");







// User registration using username,email_id,phone_no,password


registerroutes.post("/reg", async (req, res) => {

  try { 
    const oldUser = await loginDB.findOne({ username: req.body.username });
    console.log(oldUser)
    if (oldUser) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "User already exists" });
    }

    const oldphone = await registerDB.findOne({ phone_no: req.body.phone_no });
    if (oldphone) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Phone number already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    let log = {
      username: req.body.username,
      password: hashedPassword,
      role: 2,
    };
    const result = await loginDB(log).save();
    let reg = {
      login_id: result._id,
      email_id: req.body.email_id,
      phone_no: req.body.phone_no,
    };
    const result2 = await registerDB(reg).save();
    if (result2) {
      res.status(201).json({
        success: true,
        error: false,
        message: "Registration completed",
        details: result2,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: "Something went wrong",

      errorMessage: error.message,
    }); 
    console.log(error);
  }
});

module.exports = registerroutes;
