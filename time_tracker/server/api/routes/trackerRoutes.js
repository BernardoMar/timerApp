const trackerController = require('../controllers/trackerController');

module.exports = (app) => {
  app
    .route('/tasks')
    .get(trackerController.listAllTasks)
    .post(trackerController.createATask);

  app
    .route('/tasks/:taskId')
    .get(trackerController.readATask)
    .put(trackerController.updateATask)
    .delete(trackerController.deleteATask)
};
