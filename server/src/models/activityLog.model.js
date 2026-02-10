import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
    actor: {
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required: true
    },
    actorName: {
        type: String,
        required: true
    },
    action: {
        type: String,
        enum: ["Created", "Updated", "Deleted", "Added Member To", "Removed Member From" ],
        required: true
    },
    project: {
        type: mongoose.Schema.ObjectId,
        ref: "Project",
        required: true
    },
    entityType: {
        type: String,
        enum: ["Project", "Task"],
        required: true
    },
    entityId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    entityName: {
        type: String,
        required: true
    }

},{timestamps: true});

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;