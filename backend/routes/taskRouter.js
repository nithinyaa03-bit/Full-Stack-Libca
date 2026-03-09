const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.post("/", async (req, res) => {

  const task = new Task(req.body);
  await task.save();

  res.json(task);

});

module.exports = router;