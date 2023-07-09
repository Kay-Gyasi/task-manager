const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

// asyncwrapper wraps a try-catch block around the async functions
const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.json({ tasks });
});

const addTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).send({message: 'Task has been created', task});
});

const getTask = asyncWrapper(async (req, res) => {
    const { id:taskId } = req.params;
    const task = await Task.findOne({ _id: taskId }).exec();
    if (!task){
        res.status(404).send(`Task with id: ${ taskId } not found`);
        return;
    }
    res.json({ task });
});

const editTask = asyncWrapper(async (req, res, next) => {
    const {id:taskId} = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
            new: true,
            runValidators: true 
        });
    if (!task){
        const error = createCustomError(`Task with id: ${ taskId } not found`, 404);
        return next(error); // pass to error handler
    }
    res.json({ id: taskId, task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
    const taskId = req.params.id;
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task){
        const error = createCustomError(`Task with id: ${ taskId } not found`, 404);
        return next(error);
    }
    res.status(204).json({msg: 'Task'});
});

module.exports = {
    getAllTasks,
    addTask,
    getTask,
    editTask,
    deleteTask
}