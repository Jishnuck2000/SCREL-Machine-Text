const express = require('express')
const authorise = require('../middleware/authorise');
const userprofileroutes = express.Router();
const mongoose = require('mongoose')
const Registerdata = require("../models/registerschema");




userprofileroutes.get("/viewprofile", authorise, (req, res) => {
    Registerdata.aggregate([
      {
        $lookup: {
          from: "login_tbs",
          localField: "login_id",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $unwind: {
          path: "$result",
        },
      },
  
      {
        $match: { login_id: new mongoose.Types.ObjectId(req.userData.userId) },
      },
      {
        $group: {
          _id: "$_id",
          email_id: {
            $first: "$email_id",
          },
          username: {
            $first: "$result.username",
          },
          password: {
            $first: "$result.password",
          },
          phone_no: {
            $first: "$phone_no",
          },
          login_id: {
            $first: "$login_id",
          },
        },
      },
    ])
      .then((data) => {
        res.status(200).json({
          success: true,
          error: false,
          data: data,
          message: "fetched profile successfully",
        });
      })
      .catch((error) => {
        res.status(400).json({
          success: false,
          error: true,
          message: "failed fetching profile",
          Errormessage: error,
        });
      });
  });
module.exports = userprofileroutes;


