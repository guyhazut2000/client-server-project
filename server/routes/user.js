const User = require("../models/User");
const router = require("express").Router();
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "clientservertesting2021@gmail.com",
    pass: "client@server2021",
  },
});

// login user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    // console.log("Server console - login user", user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// logout user
router.post("/logout", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        email: req.body.email,
        password: req.body.password,
        isOnline: true,
      },
      {
        email: req.body.email,
        password: req.body.password,
        isOnline: false,
      },
      { new: true }
    );
    console.log("Server console - Logout user", user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD USER
router.put("/add-user", async (req, res) => {
  try {
    console.log("add new user: ", req.body);
    await new User(req.body).save();
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET USER BY EMAIL
router.get("/:email", async (req, res) => {
  try {
    console.log("user email: ", req.params.email);
    const user = await User.findOne({ email: req.params.email });
    console.log("user ", user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET USER PASSWORD BY EMAIL
router.get("/forgot-password/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    console.log(user);
    if (user === null) {
      res.status(403).json({ userExists: false, mailSent: false });
    } else {
      // send mail with password
      var mailOptions = {
        from: "clientservertesting2021@gmail.com",
        to: res.params.email,
        subject: "Car Service Password",
        text: "Your Password is: " + user.password,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json({ userExists: true, mailSent: true });
        }
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
