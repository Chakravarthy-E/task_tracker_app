const {
  Create,
  Get,
  Delete,
  Update,
} = require("../controllers/taskController.js");
const express = require("express");

const router = express.Router();

router.post("/tasks", Create);
router.get("/tasks", Get);
router.delete("/tasks/:id", Delete);
router.put("/tasks/:id", Update);

module.exports = router;
