import mongoose from "mongoose";
import User from "../models/user.model.js"

const commenstSchema = new mongoose.Schema({
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
        required:true
    },

    name:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true,
    },
    
    isApproved:{
        type:Boolean,
        default: true,
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    
    }
},{timestamps:true});

const Comment =mongoose.model('Comment',commenstSchema);

export default Comment;