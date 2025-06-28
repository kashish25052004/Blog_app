import mongoose from "mongoose"
import User from "../models/user.model.js"

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    subTitle:{
        type:String,
        
    },

    description:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true,
    },

    image:{
        type: String,
        required:true
    },

    isPublished:{
        type:Boolean,
        reuired:true
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },

    userName:{
        type:String,
        required:true

    }

    

},{timestamps:true});

const Blog = mongoose.model('Blog',blogSchema);

export default Blog;

