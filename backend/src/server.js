import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
dotenv.config()
import cors from 'cors'
const app = express()

const port = process.env.PORT

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
app.use("/api/user",userRoute)
app.use("/api/user",chatRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
        
    
