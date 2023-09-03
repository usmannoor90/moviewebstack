const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const router = express.Router();
require("dotenv").config();
const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }));

app.use(express.json());
app.use(router);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/", require("./routes/signup"));
app.use("/", require("./routes/login"));

app.get("/", (req, res) => {
  res.send("showing the response");
});

app.listen(process.env.PORT || 9000, () =>
  console.log("listening to port 9000....")
);
