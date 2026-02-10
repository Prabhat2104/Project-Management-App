import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["assigned", "inprogress", "completed"],
        default: "assigned"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low"
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    projectId: {
        type: Number,
        required: true,
        unique: true
    }
}, {timestamps: true})

const Project = mongoose.model("Project", projectSchema);

export default Project;