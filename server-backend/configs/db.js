import mongoose, { connect } from "mongoose"

const connectDB = async () =>{
    try {
        mongoose.connection.on('connected',()=> console.log("Database connected")
        )
        await mongoose.connect(`${process.env.MONGODB_URI}/blogapp`)

    } catch (error) {
        console.log("Error connecting to MongoDB (file name : configs/db.js):", error);
        
    }
}

export default connectDB;