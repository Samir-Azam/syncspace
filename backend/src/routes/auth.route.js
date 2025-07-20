import {Router} from "express"
import { login, logout, signup, onboarding } from "../controllers/auth.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

router.post("/onboarding", protectRoute, onboarding);

router.get("/me",protectRoute, (req, res) => res.status(200).json({
    success:true,
    message:"User found successfully",
    user:req.user
}));

export default router