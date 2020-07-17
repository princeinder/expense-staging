const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
require("./config/conn")(mysql);
const users = require("./routes/api/users");
const plaid = require("./routes/api/plaid");
const account = require("./routes/api/account");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());

// Passport config

require("./config/passport")(passport);
// Routess
app.get("/", (req, res) => {
  res.json({ expense: "expense" });
});

app.use("/api/user", users);
app.use("/api/account", account);
app.use("/api/plaid", plaid);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
