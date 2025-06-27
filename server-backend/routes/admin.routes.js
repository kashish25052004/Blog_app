import express from "express"
import { adminLogin, approveCommentsById, deleteCommentsById, getAllBlogsAdmin, getAllComments, getDashboard } from "../controllers/admin.controller.js"
import auth from "../middleware/auth.middleware.js"

const adminRouter = express.Router()
adminRouter.post("/login",adminLogin)
adminRouter.get("/comments",auth,getAllComments)
adminRouter.get("/blogs",auth,getAllBlogsAdmin)
adminRouter.post("/delete-comment",auth,deleteCommentsById);
adminRouter.post("/approve-comment",auth,approveCommentsById);
adminRouter.get("/dashboard",auth,getDashboard)



export default adminRouter

