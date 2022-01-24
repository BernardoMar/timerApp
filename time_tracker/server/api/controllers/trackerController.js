const mongoose = require('mongoose');
const TaskTracker = mongoose.model('TaskTracker');


exports.listAllTasks = (req, res) => {
  TaskTracker.find({}, (err, tasks) => {
    if (err) res.send(err);
    res.json(tasks);
  });
};

exports.createATask = (req, res) => {
  const newTask = new TaskTracker(req.body);
  newTask.save((err, task) => {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.readATask = (req, res) => {
  TaskTracker.findByID(req.params.taskId, (err, task) => {
    if (err) res.send(err);
    res.json(task)
  });
};

exports.updateATask = (req, res) => {
  TaskTracker.findOneAndUpdate(
    {_id: req.params.taskId},
    req.body,
    {new: true},
    (err, task) => {
      if (err) res.send(err);
      res.json(task)
    }
  );
};

exports.deleteATask = (req, res) => {
  TaskTracker.deleteOne({_id: req.params.taskId}, (err) => {
    if (err) res.send(err);
    res.json({
      message: 'Task Deleted',
      _id: req.params.taskId
    });
  });
};
