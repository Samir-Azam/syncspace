import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
dotenv.config()
import cors from 'cors'

import path from 'path'
const app = express()

const port = process.env.PORT

const __dirname = path.resolve();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import chatRoute from './routes/chat.route.js'

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/chat",chatRoute)

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("*",(req, res)=>{
    res.sendFile(path.join(__dirname, "../frontend","dist","index.html"))
  })
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
        
    
