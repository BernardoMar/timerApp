const mongoose = require('mongoose');

const {Schema} = mongoose;

const TrackerSchema = new Schema(
  {
    taskName: {
      type: String,
      required: 'Task Name cannot be blank'
    },
    start: {
      type: String
    },
    finish: {
      type: String
    },
    color: {
      type: String
    },
    startTime: {
      type: Number
    },
    finishTime: {
      type: Number
    },
    duration: {
      type: String
    }
  },
  {collection: 'taskTracker'}
);

module.exports = mongoose.model('TaskTracker', TrackerSchema);
