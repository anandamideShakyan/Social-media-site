import UserModel from "../Models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
//Registering a new User
export const registerUser = async (req, res) => {
	const salt = await bcrypt.genSalt(10)
	req.body.password = await bcrypt.hash(req.body.password, salt)
	const newUser = new UserModel(req.body)

	try {
		const oldUser = await UserModel.findOne({ username: req.body.username })
		if (oldUser) {
			return res.status(400).json("User already exists with this username")
		}
		const user = await newUser.save()
		const token = jwt.sign(
			{
				username: user.username,
				id: user._id
			},
			process.env.JWT_KEY,
			{ expiresIn: "1h" }
		)
		const { password, ...rest } = user.toObject()
		res.status(200).json({ user: rest, token })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

//login User

export const loginUser = async (req, res) => {
	const { username, password } = req.body
	try {
		let user = await UserModel.findOne({ username: username })
		if (user) {
			const validity = await bcrypt.compare(password, user.password)
			if (validity) {
				const token = jwt.sign(
					{
						username: user.username,
						id: user._id
					},
					process.env.JWT_KEY,
					{ expiresIn: "1h" }
				)
				const { password, ...rest } = user.toObject()
				res.status(200).json({ user: rest, token })
			} else res.status(400).json("Wrong Password")
		} else {
			res.status(404).json("User does not exists")
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
