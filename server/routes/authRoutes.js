const express = require("express");

const router = express.Router();
const cors = require("cors");

const {
  userRegister,
  userLogin,
  getUser,
} = require("../controllers/authController.js");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/user", getUser);

module.exports = router;
