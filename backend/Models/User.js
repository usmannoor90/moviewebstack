const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/playground")
  .then(() => {
    console.log("connected to mongoDB.....");
  })
  .catch((err) => {
    console.log("could not connected to mongoDB", err);
  });

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  date: String,
  email: String,
  password: String,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
