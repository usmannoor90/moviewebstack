const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const User = require("../Models/User");

router.use(express.json());

router.post("/login", async (req, res) => {
  try {
    const { data } = req.body;
    console.log(data.email);
    const user = await User.findOne({ email: data.email });

    if (!user) {
      return res.status(400).json({ msg: "user does not exits" });
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "user's password is wrong" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token: token, user });
  } catch (err) {
    res.status(501).json({ error: err.message });
  }
});

module.exports = router;
