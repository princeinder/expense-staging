const express = require("express");
const router = express.Router();

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/user");

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const user = User.getUserInstance();
  const exists = user.fieldExists("email", newUser.email);
  exists.then((doc) => {
    if (doc) return res.status(404).json({ email: "Email exists already" });
    const result = user.createUser(newUser);
    result
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.status(404).json({ err }));
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newUser = {
    email: req.body.email,
    password: req.body.password,
  };
  console.log(newUser);
  const user = User.getUserInstance();
  const result = user.loginUser(newUser.email, newUser.password);
  result
    .then((doc) => {
      console.log(doc);
      if (!doc)
        return res.status(400).json({
          passwordincorrect:
            "Authentication failed ! Incorrect email or password",
        });
      res.json({
        success: true,
        token: "JWT " + doc,
      });
    })
    .catch((err) => {
      res.status(400).json({
        passwordincorrect:
          "Authentication failed ! Incorrect email or password",
      });
    });
});

module.exports = router;
