const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        // validation on db
        type: String,
        required: [true, 'name is required'],
        trim: true,
        maxlength: [20, 'name is too long']
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', TaskSchema);