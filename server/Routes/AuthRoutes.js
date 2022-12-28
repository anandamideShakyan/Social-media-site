import express from "express"
import { loginUser, registerUser } from "../Controllers/AuthController.js"

import passport from "passport"
const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)

export default router
