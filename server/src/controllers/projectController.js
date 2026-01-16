import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

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

        // membersData.forEach(member => {
        //     member.projects.push(project._id);
        //     member.save();
        // });
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
        const { title, description, priority,status } = req.body;

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

        const project = await Project.findOne({projectId: id});
        if(!project){
            return res.json({success: false, message: "Project not found"})
        }

        project.title = title;
        project.description = description;
        project.priority = priority;
        project.status = status;
        project.updatedAt = Date.now();
        await project.save();

        // Update user projects arrays
        // membersData.forEach(member => {
        //     if (!member.projects.includes(project._id)) {
        //         member.projects.push(project._id);
        //         member.save();
        //     }
        // });
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
        const project = await Project.findOne({projectId: id});
        const project_id = project._id;
        
        if(!project){
            return res.json({success: false, message: "Project not found"})
        }
        await Project.findByIdAndDelete(project_id);
        const membersData = await User.find({ _id: { $in: project.members } });
        membersData.forEach(async member => {
            member.projects.pull(project._id);
            await member.save();
        });
        const user = await User.findById(req.user.id);
        user.projects.pull(project._id);
        await user.save();
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

        res.status(200).json({ success: true, project, message: "Member deleted from project successfully" })


    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error while deleting member from project" })
    }
}

export { createProject, getProjectForMember, getAllProjects, updateProject, deleteProject, addMemberToProject, deleteMemberFromProject }