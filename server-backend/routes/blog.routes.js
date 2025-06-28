import express from "express";
import { addBlog, addComment, deletBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from "../controllers/blog.controller.js";
import auth from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js"
const blogRouter = express.Router();


//api end points
blogRouter.post("/add",upload.single('image'),auth,addBlog)
blogRouter.get('/all' ,getAllBlogs)
blogRouter.get('/:blogId',getBlogById);
blogRouter.post('/delete',auth,deletBlogById)//only admin can delete blog
blogRouter.post('/toggle-publish',auth,togglePublish)
blogRouter.post('/add-comment',auth,addComment)
blogRouter.post('/comments',getBlogComments);
blogRouter.post('/generate',auth,generateContent)


export default blogRouter

