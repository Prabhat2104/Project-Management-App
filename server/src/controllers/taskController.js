import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import Project from "../models/project.model.js";
import Comment from "../models/comment.model.js";
import sendMail from "../services/mailService.js";

const createTask = async (req, res) => {
    try {
        const {title, description, status, priority, projectId, assignedTo} = req.body;
        const project = await Project.findOne({ projectId });
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        const assignedUser = await User.findOne({email: assignedTo});
        if (!assignedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const task = await Task.create({ title, description, status, priority, project: project._id, assignedTo: assignedUser._id });
        project.tasks.push(task._id);
        await project.save();
        assignedUser.tasks.push(task._id);
        await assignedUser.save();
        await sendMail(assignedUser.email, "Task Created", `Task ${task.title} has been created for you`);
        res.status(201).json({ success: true, task, message: "Task created successfully" })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error while creating task" })
    }
}

const updateTask = async (req, res) => {
    try {
        const {title, description, status, priority, assignedTo, comments} = req.body;
        const task = await Task.findOne({ _id: req.params.id });
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        // if(projectId){
        //     const project = await Project.findOne({ projectId });
        //     if (!project) {
        //         return res.status(404).json({ success: false, message: "Project not found" });
        //     }
        //     task.project = project._id;
        // }
        if(assignedTo){
            const assignedUser = await User.findOne({email: assignedTo});
            if (!assignedUser) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            task.assignedTo = assignedUser._id;
            await sendMail(assignedUser.email, "Task Updated", `Task ${task.title} has been updated for you`);
        }
        if(task.assignedTo){
            const taskAssignedUser = await User.findOne({_id: task.assignedTo});
            await sendMail(taskAssignedUser.email, "Task Updated", `Task ${task.title} has been updated for you`);
        }
        if(comments){
            const comment = await Comment.create({content: comments, task: req.params.id, user: req.user.id});
            task.comments.push(comment._id);
            //await task.save();
        }
        
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.priority = priority || task.priority;
        
        await task.save();
        res.status(200).json({ success: true, task, message: "Task updated successfully" })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error while updating task" })
    }
}
const getAllTaskForProject = async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.id });
        if (!tasks) {
            return res.status(404).json({ success: false, message: "Tasks not found" });
        }
        res.status(200).json({ success: true, tasks, message: "Tasks fetched successfully" })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error while getting tasks" })
    }
}

const getstatusqueriedtasks = async(req, res) => {
    const {status} = req.query;
    try {
        const tasks = await Task.find({ status: status });
        if (!tasks) {
            return res.status(404).json({ success: false, message: "Tasks not found" });
        }
        res.status(200).json({ success: true, tasks })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error while getting tasks" })
    }
}

const getTasksForUser = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.params.id });
        if(!tasks){
            return res.status(404).json({success: "false", message: "Tasks not found"})
        }
        res.status(200).json({success: true, tasks});
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error while getting tasks for an user" })
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete({ _id: req.params.id });
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        const project = await Project.findOne({ _id: task.project });
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        project.tasks.pull(task._id);
        await project.save();
        const assignedUser = await User.findOne({ _id: task.assignedTo });
        if (!assignedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        assignedUser.tasks.pull(task._id);
        await assignedUser.save();
        res.status(200).json({ success: true, message: "Task deleted successfully" })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error while deleting task" })
    }
}


export {createTask, updateTask, getAllTaskForProject, getstatusqueriedtasks, deleteTask, getTasksForUser};