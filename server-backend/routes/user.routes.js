import express from "express";
import { registerUser, loginUser ,getAllCommentsUser,getAllBlogsUser,deleteCommentsById,approveCommentsById,getDashboard} from "../controllers/user.controller.js";

import auth from "../middleware/auth.middleware.js"
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/comments",auth,getAllCommentsUser)
userRouter.get("/blogs",auth,getAllBlogsUser)
userRouter.post("/delete-comment",auth,deleteCommentsById);
userRouter.post("/approve-comment",auth,approveCommentsById);
userRouter.get("/dashboard",auth,getDashboard)


export default userRouter;