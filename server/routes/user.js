const User = require("../models/User");
const router = require("express").Router();
var nodemailer = require("nodemailer");
const CryptoJS = require("crypto-js");

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
    // find user
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(200).json(null);
      return;
    }
    // hash user password
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    // check if password match.
    OriginalPassword !== req.body.password && res.status(200).json(null);
    // return user data
    console.log("Server console - login user", user);
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
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
    const res = await User(newUser).save();
    // send mail with password
    if (res) {
      var mailOptions = {
        from: "clientservertesting2021@gmail.com",
        to: req.params.email,
        // to: "guyhazut3000@gmail.com",
        subject: "Car Service App",
        text: "Welcome! Thanks for signing up for our app.",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
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
      res.status(200).json({ userExists: false, mailSent: false });
    } else {
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      // send mail with password
      var mailOptions = {
        from: "clientservertesting2021@gmail.com",
        to: req.params.email,
        // to: "guyhazut3000@gmail.com",
        subject: "Car Service Password",
        text: "Your Password is: " + OriginalPassword,
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
