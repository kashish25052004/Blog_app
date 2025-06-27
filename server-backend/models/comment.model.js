import mongoose from "mongoose";
import mondoose from "mongoose";
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
        default: false,
    }
},{timestamps:true});

const Comment =mongoose.model('Comment',commenstSchema);

export default Comment;