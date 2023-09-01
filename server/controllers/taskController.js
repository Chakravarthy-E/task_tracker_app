const moment = require("moment");
const Tasks = require("../models/tasks.js");

const Create = (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  try {
    // Format the dueDate as ISO 8601 before saving it to MongoDB
    const formattedDueDate = moment(dueDate, "DD-MM-YYYY").format("YYYY-MM-DD");
    const task = new Tasks({
      title,
      description,
      dueDate: formattedDueDate,
      priority,
    });
    task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const Get = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const Delete = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Tasks.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(deletedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const Update = async (req, res) => {
  const { id } = req.params;
  try {
    const updateId = await Tasks.findByIdAndUpdate(id);
    res.json(updateId);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
module.exports = {
  Create,
  Get,
  Delete,
  Update
};
