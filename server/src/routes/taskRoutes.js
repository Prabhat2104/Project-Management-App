import express from "express";
import {createTask, updateTask, getAllTaskForProject, getstatusqueriedtasks, deleteTask, getTasksForUser, getTasksForUserOfProject} from "../controllers/taskController.js";
import {protectRoute, isAdminRoute} from "../middlewares/protectRoute.js";

const taskRouter = express.Router();

taskRouter.post("/create", protectRoute, isAdminRoute, createTask);
taskRouter.put("/update/:id", protectRoute, isAdminRoute, updateTask);
taskRouter.get("/get/:id", protectRoute, isAdminRoute, getAllTaskForProject);
//taskRouter.get("/get/:id", protectRoute, getAllTaskForProject);
taskRouter.get("/get", protectRoute, isAdminRoute, getstatusqueriedtasks);
taskRouter.delete("/delete/:id", protectRoute, isAdminRoute, deleteTask);
taskRouter.get("/getTasksForUser/:id", protectRoute, getTasksForUser);

taskRouter.get("/getUserTasksOfProject/:id",protectRoute, getTasksForUserOfProject);

export default taskRouter;