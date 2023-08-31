const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  // console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "That Email Is Already Registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

//create json webtoken

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "chakravarthhy", {
    expiresIn: maxAge,
  });
};

const userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};
//login

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  let errorMessage = "";
  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ autherization: token });
  } catch (error) {
    if (
      error.message.includes("incorrect password") ||
      error.message.includes("incorrect email")
    ) {
      errorMessage = "Invalid user details";
    }
    res.status(400).json(errorMessage);
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
  userRegister,
  userLogin,
  getUser,
};
