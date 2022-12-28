import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const authMiddleWare = (req, res, next) => {
	try {
		const secret = process.env.JWT_KEY
		const token = req.header.Authorization.split(" ")[1]
		if (token) {
			const decoded = jwt.verify(token, secret)
			req.body._id = decoded?.id
		}
		next()
	} catch (error) {
		console.log(error)
	}
}
export default authMiddleWare
