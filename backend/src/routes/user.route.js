import express from 'express'
import { protectRoute } from '../middlewares/auth.middleware.js'
import {getRecommendedUsers,getMyFriends, sendFriendRequest} from '../controllers/user.controller.js'

const router = express.Router()

router.use(protectRoute)

router.get("/",getRecommendedUsers)
router.get("/friends",getMyFriends)
router.get("/friend-request/:id",sendFriendRequest)

export default router