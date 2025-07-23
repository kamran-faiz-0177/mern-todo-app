const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean,
        required: true,
    },
});

const TaskModel = mongoose.model("todo",TaskSchema);
module.exports = TaskModel;