import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())

import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'

app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)

try {
    connectDB()
    app.listen(port,(req, res)=>{
        console.log(`server is running at ${port}`);
        
    })
} catch (error) {
    console.log("Error in connecting MongoDB")
}
