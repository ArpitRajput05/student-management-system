const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    const saved = await student.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update student
router.put('/:id', async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE student
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;