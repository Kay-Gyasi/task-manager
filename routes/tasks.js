const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    addTask,
    getTask,
    editTask,
    deleteTask
} = require('../controllers/tasks');

router.route('/').get(getAllTasks).post(addTask);
router.route('/:id').get(getTask).patch(editTask).delete(deleteTask);

module.exports = router;