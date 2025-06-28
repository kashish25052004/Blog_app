import express from 'express'
import 'dotenv/config'
import cors from 'cors'  // take hum rontend aur backend ko merge kar sake voh permission
const app = express();
import connectDB from './configs/db.js';
import adminRouter from './routes/admin.routes.js';
import blogRouter from './routes/blog.routes.js';
import userRouter from './routes/user.routes.js';

await connectDB()

// midleware
app.use(cors());
app.use(express.json())

//Routes
app.get('/',(req,res)=>res.send("Api is working"))
app.use('/api/admin', adminRouter)

// ...existing code...
app.use('/api/user', userRouter);
app.use('/api/blog',blogRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('server is running on port ' + PORT);

})

export default app;



