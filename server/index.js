const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");
require("dotenv").config();
app.use(express.json());
app.use(cors());

mongoose.connect(
  `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.7sjto.mongodb.net/merntest?retryWrites=true&w=majority`
);

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/addUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(3001, (req, res) => {
  console.log("Running on port 3001");
});
