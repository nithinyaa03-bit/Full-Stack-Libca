const Teacher = require("../models/Teacher");

exports.getTeachers = async (req, res) => {
  const teachers = await Teacher.find();
  res.json(teachers);
};

exports.addTeacher = async (req, res) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res.json(teacher);
};

exports.updateTeacher = async (req, res) => {
  const teacher = await Teacher.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(teacher);
};

exports.deleteTeacher = async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.json({ message: "Teacher deleted" });
};