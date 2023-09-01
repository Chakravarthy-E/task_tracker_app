const mongoose = require("mongoose");

const TasksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
  },
});

const Tasks = mongoose.model("Tasks", TasksSchema);

module.exports = Tasks; 
