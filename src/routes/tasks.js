const express = require('express');

// se crea un enrutador 
const router = express.Router();

const Task = require('../models/Task');


// se crean las rutas HTTP

router.get('/', async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
});

router.get('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

router.post('/', async (req, res) => {
  const { title, description, hour } = req.body;
  const task = new Task({ title, description, hour });
  await task.save();
  res.json({
    status: 'Task saved'
  });
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, hour, status } = req.body;
    const task = await Task.findByIdAndUpdate(id, { title, description, hour, status },
       { new: true });
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating task' });
  }
});

router.delete('/:taskId', async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.taskId });
  res.json({
    status: 'Task deleted'
  });
});
;

//se exporta  el enrutador para que pueda ser usado por express
module.exports = router;
