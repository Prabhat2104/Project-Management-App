import express from "express";
import { getActivityOfProject } from "../controllers/activityLogController.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const activityRouter = express.Router();

activityRouter.get("/getactivities/:id", protectRoute, getActivityOfProject);

export default activityRouter;