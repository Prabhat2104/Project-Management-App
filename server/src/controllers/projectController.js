import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import ActivityLog from "../models/activityLog.model.js";
import mongoose from "mongoose";
import { getIO } from "../socket/socket.js";

const createProject = async (req, res) => {
    try {
        const { title, description, priority, projectId } = req.body;
        //const membersData = await User.find({ $or: [{ email: { $in: members } }, { _id: { $in: members } }] });

        // const membersData = members.map(member => {
        //     return User.findOne({ email: member });
        // });
        //console.log(membersData);
        //const membersIds = membersData.map(member => member._id);
        const project = await Project.create({ title, description, priority: priority.toLowerCase(), projectId });
        project.admin = req.user.id;
        await project.save();
        const user = await User.findById(req.user.id);
        user.projects.push(project._id);
        await user.save();

        const io = getIO();
        //io.to(`user:${req.user.id}`).emit("project:created", project);

        // Emit to members (if any)
        project.members.forEach((memberId) => {
            io.to(`user:${memberId.toString()}`).emit(
                "project:created",
                project
            );
        });

        // membersData.forEach(member => {
        //     member.projects.push(project._id);
        //     member.save();
        // });

        const activity = await ActivityLog.create({actor: req.user._id,actorName: req.user.name, action: "Created", project: project._id, entityType: "Project", entityId: project._id, entityName: project.title});

        io.to(`project:${project.projectId}`).emit("activity:projectCreated", activity);


        res.status(201).json({ success: true, project, message: "Project created successfully" })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error while creating project" })
    }
}

const getProjectForMember = async (req, res) => {
    try {
        const projects = await Project.find({ members: req.user.id });
        res.status(200).json({ success: true, projects, message: "Projects fetched successfully" })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error while fetching projects" })
    }
}

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({ success: true, projects, message: " AllProjects fetched successfully" })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error while fetching all projects" })
    }
}

const updateProject = async (req, res) => {
    // Helper to check if string is valid ObjectId
    //const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

    try {
        const { id } = req.params;
        const { title, description, priority, status } = req.body;

        // const memberIds = members.filter(m => isValidObjectId(m));
        // const memberEmails = members.filter(m => !isValidObjectId(m));

        // const membersData = await User.find({
        //     $or: [
        //         { _id: { $in: memberIds } },
        //         { email: { $in: memberEmails } }
        //     ]
        // });

        //const finalMemberIds = membersData.map(member => member._id);

        // const project = await Project.findByIdAndUpdate(id, {
        //     title,
        //     description,
        //     priority,
        //     members: finalMemberIds
        // }, { new: true });

        const project = await Project.findOne({ projectId: id });
        if (!project) {
            return res.json({ success: false, message: "Project not found" })
        }

        project.title = title;
        project.description = description;
        project.priority = priority;
        project.status = status;
        project.updatedAt = Date.now();
        await project.save();

        const io = getIO();
        // io.to(project.projectId).emit("project:updated", project);

        io.to(`user:${req.user.id}`).emit("project:updated", project);

        // Emit to members (if any)
        project.members.forEach((memberId) => {
            io.to(`user:${memberId.toString()}`).emit(
                "project:updated",
                project
            );
        });

        // Update user projects arrays
        // membersData.forEach(member => {
        //     if (!member.projects.includes(project._id)) {
        //         member.projects.push(project._id);
        //         member.save();
        //     }
        // });


        const activity = await ActivityLog.create({actor: req.user._id, actorName: req.user.name, action: "Updated", project: project._id, entityType: "Project", entityId: project._id, entityName: project.title})

        io.to(`project:${project.projectId}`).emit("activity:projectUpdated", activity);

        res.status(200).json({ success: true, project, message: "Project updated successfully" })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error while updating project" })
    }
}

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findOne({ projectId: id });
        const project_id = project._id;

        if (!project) {
            return res.json({ success: false, message: "Project not found" })
        }
        
        const membersData = await User.find({ _id: { $in: project.members } });
        membersData.forEach(async member => {
            member.projects.pull(project._id);
            await member.save();
        });
        await Project.findByIdAndDelete(project_id);
        const user = await User.findById(req.user.id);
        user.projects.pull(project._id);
        await user.save();


        const io = getIO();
        //io.to(project.projectId).emit("project:deleted", project);

        io.to(`user:${req.user.id}`).emit("project:deleted", project.projectId);

        // Emit to members (if any)
        project.members.forEach((memberId) => {
            io.to(`user:${memberId.toString()}`).emit(
                "project:deleted",
                project.projectId
            );
        });

        const activity = await ActivityLog.create({actor: req.user._id,actorName: req.user.name, action: "Deleted", project: project._id, entityType: "Project", entityId: project._id, entityName: project.title});

        io.to(`project:${project.projectId}`).emit("activity:projectDeleted", activity);


        res.status(200).json({ success: true, project, message: "Project deleted successfully" })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error while deleting project" })
    }
}

const addMemberToProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { member } = req.body;
        const memberData = await User.findOne({ email: member });
        if (!memberData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const project = await Project.findOne({ projectId: id });
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        if (project.members.includes(memberData._id)) {
            return res.status(400).json({ success: false, message: "User is already a member" });
        }

        project.members.push(memberData._id);
        await project.save();



        const user = await User.findById(memberData._id);
        if (!user.projects.includes(project._id)) {
            user.projects.push(project._id);
            await user.save();
        }

        const io = getIO();
        // io.to(project.projectId).emit("project:memberAdded", project);
        // io.to(`user:${req.user.id}`).emit("project:memberAdded", project);

        // // Emit to members (if any)
        // project.members.forEach((memberId) => {
        // io.to(`user:${memberId.toString()}`).emit(
        //     "project:memberAdded",
        //     project
        // );
        // });

        io.to(`user:${memberData._id}`).emit("project:memberAdded", project);

        // Notify existing members + admin
        project.members.forEach((memberId) => {
            io.to(`user:${memberId}`).emit("project:updated", project);
        });

        // Also notify admin
        io.to(`user:${project.admin}`).emit("project:updated", project);

        const activity = await ActivityLog.create({actor: req.user._id,actorName: req.user.name, action: "Added Member To", project: project._id, entityType: "Project", entityId: project._id, entityName: project.title});

        io.to(`project:${project.projectId}`).emit("activity:projectMemberAdded", activity);

        res.status(200).json({ success: true, project, message: "Member added to project successfully" })


    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error while adding member to project" })
    }
}

const deleteMemberFromProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { member } = req.body;
        const memberData = await User.findOne({ email: member });
        if (!memberData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const project = await Project.findOne({ projectId: id });
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        if (!project.members.includes(memberData._id)) {
            return res.status(400).json({ success: false, message: "User is not a member" });
        }

        project.members.pull(memberData._id);
        await project.save();

        const user = await User.findById(memberData._id);
        if (user.projects.includes(project._id)) {
            user.projects.pull(project._id);
            await user.save();
        }

        const io = getIO();
        // io.to(project.projectId).emit("project:memberRemoved", project);
        // io.to(`user:${req.user.id}`).emit("project:memberRemoved", project);

        // // Emit to members (if any)
        // project.members.forEach((memberId) => {
        // io.to(`user:${memberId.toString()}`).emit(
        //     "project:memberRemoved",
        //     project
        // );
        // });

        io.to(`user:${memberData._id}`).emit("project:memberRemoved", {
            projectId: project.projectId,
        });

        // Notify remaining members + admin
        project.members.forEach((memberId) => {
            io.to(`user:${memberId}`).emit("project:updated", project);
        });

        io.to(`user:${project.admin}`).emit("project:updated", project);

        const activity = await ActivityLog.create({actor: req.user._id,actorName: req.user.name, action: "Removed Member From", project: project._id, entityType: "Project", entityId: project._id, entityName: project.title})

        io.to(`project:${project.projectId}`).emit("activity:projectMemberRemoved", activity);

        res.status(200).json({ success: true, project, message: "Member deleted from project successfully" })


    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error while deleting member from project" })
    }
}

export { createProject, getProjectForMember, getAllProjects, updateProject, deleteProject, addMemberToProject, deleteMemberFromProject }