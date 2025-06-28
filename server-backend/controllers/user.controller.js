import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Blog from "../models/blog.model.js"
import Comment from "../models/comment.model.js";

// User Registration
export const registerUser = async (req, res) => {
    try {
        const { email, password,name } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashedPassword,name });
        res.json({ success: true, message: "Registration successful" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// User Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getAllBlogsUser = async (req,res)=>{
    try {
        const userId = req.user.id;
        const blogs = await Blog.find({userId}).sort({createdAt:-1});
        res.json({success:true,blogs})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}

export const getAllCommentsUser =async (req,res) =>{
    try {
        const userId = req.user.id;
        const comments = await Comment.find({userId}).populate("blog").sort({createdAt: -1})
        res.json({success:true,comments})
    } catch (error) {

        res.json({success:false,message:error.message})
        
    }

}

export const getDashboard = async(req,res)=>{
    try {
        //-1=>decreacing order 
        const userId = req.user.id;

        const recentBlogs = await Blog.find({userId}).sort({createdAt:-1}).limit(5);
        const blogs = await Blog.find({userId}).countDocuments();
        const comments = await Comment.find({userId}).countDocuments();
        const draft = await Blog.find({userId}).countDocuments({isPublished:false});

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




