import express from "express"
import {
	createPost,
	deletePost,
	getPost,
	getTimelinePosts,
	likePost,
	updatePost
} from "../Controllers/PostController.js"
const router = express.Router()
router.route("/").post(createPost)
router.route("/:id").get(getPost).put(updatePost).delete(deletePost)
router.route("/:id/like").post(likePost)
router.get("/:id/timeline", getTimelinePosts)
export default router
