import User from "../models/User.js"
import FriendRequest from "../models/FriendRequest.js"

export async function getRecommendedUsers(req, res){
    try {
        const currentUserId = req.user._id
        const currentUser = req.user

        const recommendedUsers = await User.find({
            $and:[
                { _id :{ $ne : currentUserId }},
                { _id :{ $nin : currentUser.friends }},
                { isOnboarded : true }
            ]
        })

        res.status(200).json(recommendedUsers)
    } catch (error) {
        console.log("Error in getRecommendedUsers controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function getMyFriends(req, res){
    try {
        const user = await User.findById(req.user._id)
        .select("friends")
        .populate("friends", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(user.friends)
    } catch (error) {
        console.log("Error in getMyFriends controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function sendFriendRequest(req,res){
    const myId = req.user._id
    const {id:recipientId} = req.params
    if (myId===recipientId) {
        return res.status(400).json({message:"You cannot send a friend request to yourself"})
    }
    const recipient = await User.findById(recipientId)
    if (!recipient) {
        return res.status(400).json({message:"Recipient not found"})
    }
    if (recipient.friends.includes(myId)) {
        return res.status(400).json({message:"You are already friends with this user"})
    }
    
}