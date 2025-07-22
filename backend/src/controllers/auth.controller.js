
import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import { upsertStreamUser } from "../lib/stream.js";

export async function signup(req, res){
    const {fullName, email, password} = req.body
    try {
        if (!fullName || !email || !password){
            return res.status(400).json({message:"All the fields are mandatory"})
        }
        if (password.length<8){
            return res.status(400).json({message: "Password must be at least 8 characters"})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!emailRegex.test(email)) {
          return res.status(400).json({ message: "Invalid email format" });
        }
        const user = await User.findOne({email})
        if (user){
            return res.status(400).json({message: "Email already exists please use a different one"})
        }
    
        const index = Math.floor((Math.random()*100)+1)
        const randomAvatar = `https://avatar.iran.liara.run/public/${index}.png`
    
        const newUser  = await User.create({
            fullName,
            email,
            password,
            profilePic: randomAvatar
        })

        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || ""
            })
            console.log(`Stream user is created for ${newUser.fullName}`);
            
        } catch (error) {
            console.log("Error in creating the Stream user", error)
        }
    
        const token = jwt.sign({userId: newUser._id},process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })
    
        res.cookie("token", token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly:true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === 'production'
        });
    
        res.status(201).json({
            success:true,
            user:newUser
        })
    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}
export async function login(req, res) {
  const {email, password} = req.body
  try {
    if (!email || !password) {
      return res.status(400).json({message:"All the fields are mandatory"})
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User with this email does not exist" });
    }
  
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
  
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY, {
      expiresIn: "7d"
    })
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
  
    res.status(200).json({success:true,
      user
    })
  } catch (error) {
    cconsole.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  } 
}
export function logout(req, res) {
  res.clearCookie("token")
  res.status(200).json({
    success:true,
    message:"Logout Successfully"
  })
}

export async function onboarding(req, res){
    try {
      const userId = req.user._id;
      const { fullName, bio, nativeLanguage, learningLanguage, location } =
        req.body;
      if (
        !fullName ||
        !bio ||
        !nativeLanguage ||
        !learningLanguage ||
        !location
      ) {
        return res.status(400).json({
          message: "All fields are mandatory",
          missingFields: [
            !fullName && "fullName",
            !bio && "bio",
            !nativeLanguage && "nativeLanguage",
            !learningLanguage && "learningLanguage",
            !location && "location",
          ].filter(Boolean),
        });
      }

      const user = await User.findByIdAndUpdate(
        userId,
        {
          ...req.body,
          isOnboarded: true,
        },
        { new: true }
      );

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      try {
        await upsertStreamUser({
          id: user._id.toString(),
          name: user.fullName,
          image: user.profilePic,
        });
        console.log(
          `Stream user is updated after onboarding for ${user.fullName}`
        );
      } catch (error) {
        console.log(
          `Error in updating the Stream user after onboarding`,
          error
        );
      }

      res.status(200).json({
        success: true,
        user:req.user,
      });
    } catch (error) {
      console.log("Error in onboarding controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
}