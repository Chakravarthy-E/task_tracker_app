const express = require("express");

const router = express.Router();
const cors = require("cors");

const {
  register,
  login,
  getUser,
} = require("../controllers/authController.js");

router.post("/register", register);
router.post("/login", login);
router.get("/user", getUser);

module.exports = router;
