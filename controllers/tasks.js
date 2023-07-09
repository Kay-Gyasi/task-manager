const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.json({ tasks });
    } catch (err) {
        res.status(500).send(err);
    }
}

const addTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).send({message: 'Task has been created', task});
    } catch (err) {
      res.status(500).json({msg: err}); // use shorter error messages when not debugging
    }
}

const getTask = async (req, res) => {
    try {
        const { id:taskId } = req.params;
        const task = await Task.findOne({ _id: taskId }).exec();
        if (!task){
            res.status(404).send(`Task with id: ${ taskId } not found`);
            return;
        }
        res.json({ task });
    } catch (err) {
        res.status(500).json({msg: err});
    }
}

const editTask = (req, res) => {
    res.status(204).send();
}

const deleteTask = (req, res) => {
    res.status(204).send();
}

module.exports = {
    getAllTasks,
    addTask,
    getTask,
    editTask,
    deleteTask
}