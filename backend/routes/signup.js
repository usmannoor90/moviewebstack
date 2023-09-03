const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Models/User");

router.post("/signup", async (req, res) => {
  const newuser = req.body.data;

  const user = new User({
    firstname: newuser.firstname,
    lastname: newuser.lastname,
    date: newuser.date,
    email: newuser.email,
    password: bcrypt.hashSync(newuser.password, 8),
  });

  const result = await user.save();
  console.log(result);

  res
    .status(200)
    .json({ user: result.firstname, message: "successfully signined up" });
});

module.exports = router;
