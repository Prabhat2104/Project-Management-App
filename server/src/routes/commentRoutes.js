import express from "express"
import { protectRoute } from "../middlewares/protectRoute.js";
import { createComment, getAllCommentForTask } from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.post("/create",protectRoute, createComment);
commentRouter.get("/getComments/:id",protectRoute, getAllCommentForTask);


export default commentRouter;
