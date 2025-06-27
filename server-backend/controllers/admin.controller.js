import { json } from "express";
import jwt from "jsonwebtoken";
import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";

export const adminLogin = async (req,res) =>{
    try {
        const {email,password} = req.body;

        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({success:false,message: "INvalid credential"})

        }

        const token = jwt.sign({email},process.env.JWT_SECRET)
        res.json({success:true,token})
        
    } catch (error) {
        res.json({success:false,message: error.message})

        
    }

}


export const getAllBlogsAdmin = async (req,res)=>{
    try {
        const blogs = await Blog.find({}).sort({createdAt:-1});
        res.json({success:true,blogs})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}

export const getAllComments =async (req,res) =>{
    try {
        const comments = await Comment.find({}).populate("blog").sort({createdAt: -1})
        res.json({success:true,comments})
    } catch (error) {

        res.json({success:false,message:error.message})
        
    }

}

export const getDashboard = async(req,res)=>{
    try {
        //-1=>decreacing order 
        const recentBlogs = await Blog.find({}).sort({createdAt:-1}).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const draft = await Blog.countDocuments({isPublished:false});

        const dashBoardData = {
            blogs,comments,draft,recentBlogs
        }

        res.json({success:true,dashBoardData});
        
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}

export const deleteCommentsById = async (req,res)=>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndDelete(id);

        
        res.json({success:true, message:"comments deleted successfully"})
        
    } catch (error) {

        res.json({success:false,message:error.message})
        
    }
}

export const approveCommentsById = async (req,res)=>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndUpdate(id,{isApproved:true});
        res.json({success:true, message:"comments approved successfully"})
        
    } catch (error) {

        res.json({success:false,message:error.message})
        
    }
}

