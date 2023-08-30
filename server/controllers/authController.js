const User = require("../models/user.js");
const { comparePassword, hashPassword } = require("../helpers/auth.js");
const jwt = require("jsonwebtoken");
const { error } = require("console");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //check username
    if (!username) {
      return res.json({
        error: "name is required",
      });
    }
    //check email
    if (!email) {
      return res.json({
        error: "Please enter your email",
      });
    }
    //check email
    if (!password || password.length < 6) {
      return res.json({
        error: "Password required",
      });
    }
    //check user exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "email already taken",
      });
    }
    //hashing password
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};
//login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No User found",
      });
    }
    //checking password
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        {
          email: user.email,
          id: user._id, // Use user._id instead of _id
          username: user.username,
        },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      res.json("password do not match");
    }
  } catch (error) {
    console.log(error);
  }
};

const getUser = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = {
  register,
  login,
  getUser,
};
