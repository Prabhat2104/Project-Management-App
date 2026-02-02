import express from "express"
import { registerUser, login, updateProfile } from "../controllers/userController.js";
import { userValidation } from "../validations/userDataValidation.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const userRouter = express.Router();

userRouter.post("/register",userValidation, registerUser);
userRouter.post("/login",userValidation, login);
userRouter.put("/update",protectRoute,updateProfile);

export default userRouter;
