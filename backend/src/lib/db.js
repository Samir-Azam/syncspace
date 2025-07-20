import mongoose from 'mongoose'

export  const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error in connecting MongoDB: ${error.message}`)
        process.exit(1)
    }
}