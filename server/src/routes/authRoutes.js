import express from "express"
import { registerUser, login } from "../controllers/userController.js";
import { userValidation } from "../validations/userValidation.js";

const userRouter = express.Router();

userRouter.post("/register",userValidation, registerUser);
userRouter.post("/login",userValidation, login);

export default userRouter;
