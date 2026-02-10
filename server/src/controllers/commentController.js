import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import Task from "../models/task.model.js";
import mongoose from "mongoose";

import { getIO } from "../socket/socket.js";
import Project from "../models/project.model.js";

const createComment = async (req, res) => {
    try {
        const { content, task_id, user } = req.body;
        const comment = await Comment.create({ content, task: task_id, user });
        const task = await Task.findById(task_id);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        task.comments.push(comment._id);
        await task.save();

        const io = getIO();
        const project = await Project.findById(task.project);
        io.to(`project:${project.projectId}`).emit("comment:added", comment);


        res.status(201).json({ success: true, comment, message: "Comment created successfully" })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error while creating comment" })
    }
}

const getAllCommentForTask = async(req, res) => {
    try {
        const { id } = req.params;
        const comments = await Comment.find({ task: id });
        res.status(200).json({ success: true, comments, message: "Comments fetched successfully" })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error while fetching comments" })
    }
}

export { createComment, getAllCommentForTask }