import fs from 'fs'
import imagekit from '../configs/imagekit.js';
import Blog from '../models/blog.model.js';
import Comment from '../models/comment.model.js';
import main from '../configs/gemini.js';


export const addBlog = async (req,res)=>{
    
    try{
        const {title,subTitle,description,category,isPublished} = JSON.parse(req.body.Blog)
        //string main aayega --> convert to json


        const imageFile = req.file;
        
        

        //check if all fields are present
        // stop function using return statement

        if(!title || !description || !category || !imageFile){
            return res.json({success:false,message:"MIssing required fields"})

        }

        const fileBuffer = fs.readFileSync(imageFile.path)
         

        //Upload image to imagekit
        const response = await imagekit.upload({
            file:fileBuffer,
            fileName: imageFile.originalname,
            folder:"/blogs"
        })

        //imagekit URL transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'}, //auto cmpression
                {format: 'webp'}, // convert to modern format
                {width:'1280'} //width resizing
            ]

        });

        const image = optimizedImageUrl;

        const userId = req.user.id;
        

        

        const userName = req.user.name;
        

        await Blog.create({title,subTitle,description,category,image,isPublished,userId,userName})

        res.json({success:true, message:"Blog added successfully"})


    }catch(error){

        res.json({success:false,message:error.message})

    }
} 

export const getAllBlogs = async (req,res)=>{
    try {
        const blogs = await Blog.find({isPublished: true})
        res.json({success:true,blogs})
    } catch (error) {
        res.json({success:false,message: error.message})
        
    }
}

export const getBlogById = async (req,res) => {
    try {
        const {blogId} = req.params; // we get id from url bcz --> thats why params
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.json({success:false,message:"Blog not found"})
        }
        res.json({success:true,blog})
        
    } catch (error) {
        res.json({success: false, message:error.message})

        
    }
}

export const deletBlogById = async (req,res) => {
    try {
        const {id} = req.body;
        await Blog.findByIdAndDelete(id)

        //also delete all comments associated with this blog

        await Comment.deleteMany({blog:id});
        
        res.json({success:true,message:'blog deleted succeccfully'})
        
    } catch (error) {
        res.json({success: false, message:error.message})

        
    }
}

export const togglePublish = async(req,res) => {
    try {
        const { id } = req.body
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success:true,message:'Blog status updated'})
        
    } catch (error) {
        res.json({success: false, message:error.message})
        
    }
}

export const addComment = async (req,res) => {
    try {
        const {blog, name,content} = req.body;
        const userId = req.user.id;
        
        await Comment.create({
            blog,
            name,
            content,
            userId
        });

        res.json({success:true,message:'comment added for review'})
        
    } catch (error) {

        res.json({success: false, message:error.message})
        
    }
}


export const getBlogComments = async (req,res)=>{
    try {
        const {blogId} =req.body;
        const comments = await Comment.find({blog: blogId, isApproved:true}).sort({createdAt: -1});


        res.json({success: true, comments})
        
    } catch (error) {

        res.json({success: false, message:error.message})
        
    }
}

export const generateContent = async(req,res) =>{
    try {
        const {prompt} = req.body;
       const content =  await main(prompt + 'Generate a blog content for this topic which give exitment to read this blog')
        res.json({success:true,content})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}

