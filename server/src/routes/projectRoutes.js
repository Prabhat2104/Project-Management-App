import express from "express";
import { createProject, getProjectForMember, getAllProjects, updateProject, deleteProject, addMemberToProject, deleteMemberFromProject } from "../controllers/projectController.js";
import { protectRoute, isAdminRoute } from "../middlewares/protectRoute.js";

const projectRouter = express.Router();

projectRouter.post("/create",protectRoute,isAdminRoute, createProject);
projectRouter.get("/get",protectRoute, getProjectForMember);
projectRouter.get("/getAll",protectRoute,isAdminRoute, getAllProjects);
projectRouter.put("/update/:id",protectRoute,isAdminRoute, updateProject);
projectRouter.delete("/delete/:id",protectRoute,isAdminRoute, deleteProject);
projectRouter.put("/addMember/:id",protectRoute,isAdminRoute, addMemberToProject);
projectRouter.delete("/deleteMember/:id",protectRoute,isAdminRoute, deleteMemberFromProject);


export default projectRouter;