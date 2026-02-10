import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import Project from "../models/project.model.js";
import Comment from "../models/comment.model.js";
import sendMail from "../services/mailService.js";
import { getIO } from "../socket/socket.js";
import ActivityLog from "../models/activityLog.model.js";

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
        if(!assignedUser.projects.includes(project._id)){
            return res.status(400).json({ success: false, message: "User is not a member of project"})
        }
        
        const task = await Task.create({ title, description, status, priority, project: project._id, assignedTo: assignedUser._id });
        project.tasks.push(task._id);
        await project.save();
        assignedUser.tasks.push(task._id);
        await assignedUser.save();
        //await sendMail(assignedUser.email, "Task Created", `Task ${task.title} has been created for you`);
        sendMail(assignedUser.email, "Task Created", `Task ${task.title} has been created for you`).catch(console.error);


        const io = getIO();
        io.to(`project:${projectId}`).emit("task:created", task);
        // io.to(`user:${project.admin}`).emit("task:created", task);
        // if (String(project.admin) !== String(task.assignedTo)) {
        //     io.to(`user:${task.assignedTo}`).emit("task:created", task);
        // }

        const activity = await ActivityLog.create({actor: req.user._id,actorName: req.user.name, action: "Created", project: project._id, entityType: "Task", entityId: task._id, entityName: task.title});

        io.to(`project:${project.projectId}`).emit("activity:taskCreated", activity);

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
            if(!assignedUser.projects.includes(task.project)){
                return res.status(404).json({ success: false, message: "User is not a member of this project" });
            }
            task.assignedTo = assignedUser._id;
            //await sendMail(assignedUser.email, "Task Updated", `Task ${task.title} has been updated for you`);
            sendMail(assignedUser.email, "Task Updated", `Task ${task.title} has been updated for you`).catch(console.error);
        }
        else if(task.assignedTo){
            const taskAssignedUser = await User.findOne({_id: task.assignedTo});
            //await sendMail(taskAssignedUser.email, "Task Updated", `Task ${task.title} has been updated for you`);
            sendMail(taskAssignedUser.email, "Task Updated", `Task ${task.title} has been updated for you`).catch(console.error);
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

        const project = await Project.findById(task.project);

        const io = getIO();
        io.to(`project:${project.projectId}`).emit("task:updated", task);
        // io.to(`user:${project.admin}`).emit("task:updated", task);
        // if (String(project.admin) !== String(task.assignedTo)) {
        //     io.to(`user:${task.assignedTo}`).emit("task:updated", task);
        // }

        const activity = await ActivityLog.create({actor: req.user._id, actorName: req.user.name, action: "Updated", project: project._id, entityType: "Task", entityId: task._id, entityName: task.title});

        io.to(`project:${project.projectId}`).emit("activity:taskUpdated", activity);

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
            return res.status(404).json({success: false, message: "Tasks not found"})
        }
        res.status(200).json({success: true, tasks});
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error while getting tasks for an user" })
    }
}


const getTasksForUserOfProject = async (req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ project: req.params.id, assignedTo: userId });
        
        if(!tasks){
            return res.status(404).json({success: false, message: "Tasks not found"})
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


        const io = getIO();
        io.to(`project:${project.projectId}`).emit("task:deleted", task);
        // io.to(`user:${project.admin}`).emit("task:deleted", task);
        // if (String(project.admin) !== String(task.assignedTo)) {
        //     io.to(`user:${task.assignedTo}`).emit("task:deleted", task);
        // }

        const activity = await ActivityLog.create({actor: req.user._id,actorName: req.user.name, action: "Deleted", project: project._id, entityType: "Task", entityId: task._id, entityName: task.title})

        io.to(`project:${project.projectId}`).emit("activity:taskDeleted", activity);

        res.status(200).json({ success: true, message: "Task deleted successfully" })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error while deleting task" })
    }
}


export {createTask, updateTask, getAllTaskForProject, getstatusqueriedtasks, deleteTask, getTasksForUser, getTasksForUserOfProject};