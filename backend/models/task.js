const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  email: {
    type: String,
    required: true
  },

  dueDate: {
    type: Date,
    required: true
  },

  reminderSent: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Task", taskSchema);