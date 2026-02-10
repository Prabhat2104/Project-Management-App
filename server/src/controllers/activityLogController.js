import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import ActivityLog from "../models/activityLog.model.js";

const getActivityOfProject = async(req, res) => {
    try {
        const {id} = req.params;
        const activityLogs = await ActivityLog.find({project: id}).sort({ createdAt: -1 });
        res.status(200).json({success: true, activityLogs, message: "Activity Logs fetched succesfully"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: "Error while fetching Activity Logs"} )
    }
}

export {getActivityOfProject}