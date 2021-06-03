const mongoose = require("mongoose")
const verify = require("../../verifyToken")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("./user.model")
const Event = require("../events/events.model")

const { registerValidation, loginValidation } = require("../../validation");

exports.index = async (req, res) => {
  await User.find({}).then((response) => {
    res.send(response);
  });
};

exports.getById = async (req, res) => {
    const id = req.user._id;
    await User.find({ _id: id }).then((result) => {
      res.json(result);
    });
};

exports.createNewProfile = async (req, res) => {
  var userId = new mongoose.mongo.ObjectId(req.body.userId);
  console.log('update')
  //create new eventList
  const event = new Event({
    userId: userId,
    profileName: req.body.newProfileName,
  });

  event.save()

  const data = {
    profiles: JSON.parse(req.body.profiles)
  };
  await User.updateOne({ _id: userId }, { $set: data }, () => {
    res.send("ok!");
  });
};

exports.updateUser = async (req, res) => {
  var userId = new mongoose.mongo.ObjectId(req.body.userId);

  const data = {
    profiles: JSON.parse(req.body.profiles)
  };
  await User.updateOne({ _id: userId }, { $set: data }, () => {
    res.send("ok!");
  });
};

exports.create = async (req, res) => {
  //validate
  const { error } = registerValidation(req.body);
  if (error) return res.status(203).send(error.details[0].message);

  //check if userName exist
  const userNameExist = await User.findOne({ userName: req.body.userName });
  if (userNameExist) return res.status(202).send("userName already exists");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create new user
  const user = new User({
    ...req.body,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.login = async (req, res) => {
  //validate
  const { error } = loginValidation(req.body);
  if (error) return res.status(201).send(error.details[0].message);

  //check if email exist
  const user = await User.findOne({ userName: req.body.userName });
  if (!user) return res.status(201).send("userName is wrong");
  //check if password correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(201).send("password is wrong");
  // create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
};

// exports.addEvent = async (req, res) => {
//   const id = req.body._id;
//   await User.find({ _id: id }).then(async (result) => {
//     var user = result[0];
//     var userId = new mongoose.mongo.ObjectId(id);
//     user.profiles
//       .find((element) => element.profileName === req.body.profileName)
//       .push(req.event);
//     await User.updateOne({ _id: userId }, { $set: user }, () => {
//       res.send("ok!");
//     });
//   });
// };
