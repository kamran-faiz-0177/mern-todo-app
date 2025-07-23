const TaskModel = require("../Models/TaskModel");

const CreateTask = async (req, res) => {
    try {
        const { title, isDone } = req.body;
        const task = new TaskModel({ title, isDone });
        const savedTask = await task.save(); // Await save
        res.status(200).json({
            message: "Task created successfully",
            success: true,
            task: savedTask, // Send the saved task
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create the task",
            error: error.message,
        });
    }
};

const FetchAllTask = async (req, res) => {
    try {
        const tasks = await TaskModel.find(); // Fetch all tasks
        res.status(200).json({
            message: "Successfully fetched all tasks",
            success: true,
            tasks: tasks, // Include fetched tasks
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch the tasks",
            error: error.message,
        });
    }
};

const UpdateTask = async (req, res) => {
    try {
        const { title, isDone, id } = req.body;
        console.log(isDone);
        await TaskModel.findByIdAndUpdate(
            id,
            { title, isDone },
            { new: true } // Return the updated document
        );
        const task = await TaskModel.find();
        console.log(task);
        res.status(200).json({
            message: "Task updated successfully",
            success: true,
            task,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update the task",
            error: error.message,
        });
    }
};

const DeleteTask = async (req, res) => {
    try {
        const { id } = req.body;
        await TaskModel.findByIdAndDelete(id); // Pass `id` directly
        const task = await TaskModel.find();
        res.status(200).json({
            message: "Successfully deleted the task",
            success: true,
            task,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete the task",
            error: error.message,
        });
    }
};

module.exports = {
    CreateTask,
    FetchAllTask,
    DeleteTask,
    UpdateTask,
};
