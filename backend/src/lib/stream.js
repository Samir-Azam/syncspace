import {StreamChat} from 'stream-chat'
import dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET

if (!apiKey || !apiSecret){
    console.log("Strean Api key or Secret is missing")
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret)

export const upsertStreamUser = async(userData)=>{
    try {
        await streamClient.upsertUser(userData)
        return userData
    } catch (error) {
        console.log("Error upserting Stream user",error);
    }
}

export const generateStreamToken = (userId)=>{}