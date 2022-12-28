import express from "express"
import {
	updateUser,
	getUser,
	getAllUsers,
	deleteUser,
	followUser,
	unfollowUser
} from "../Controllers/UserController.js"
import authMiddleWare from "../Middlewares/authMiddleWare.js"
const router = express.Router()

router
	.route("/:id")
	.get(getUser)
	.put(authMiddleWare, updateUser)
	.delete(authMiddleWare, deleteUser)
router.route("/:id/follow").put(authMiddleWare, followUser)
router.route("/:id/unfollow").put(authMiddleWare, unfollowUser)
router.route("/").get(getAllUsers)
export default router
