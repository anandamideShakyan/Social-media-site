import UserModel from "../Models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
//get a User
export const getUser = async (req, res) => {
	const id = req.params.id

	try {
		const user = await UserModel.findById(id)
		if (user) {
			const { password, ...otherDetails } = user._doc
			res.status(200).json(otherDetails)
		} else {
			res.status(404).json("User does not exists")
		}
	} catch (error) {
		res.status(500).json(error)
	}
}
//get all Users
export const getAllUsers = async (req, res) => {
	const id = req.params.id

	try {
		let users = await UserModel.find().limit(20)
		// console.log(users)
		if (users) {
			users = users.map((user) => {
				const { password, ...rest } = user._doc
				// console.log(rest)
				return rest
			})
			// console.log("After filter: ", users)
			res.status(200).json(users)
		} else {
			res.status(404).json("Users not found.")
		}
	} catch (error) {
		res.status(500).json(error)
	}
}

//update a user
export const updateUser = async (req, res) => {
	const id = req.params.id

	const { _id, isAdmin, password } = req.body
	if (id === _id || isAdmin) {
		try {
			// if (password) {
			// 	console.log("inside password")
			// 	const salt = await bcrypt.genSalt(10)
			// 	req.body.password = await bcrypt.hash(password, salt)
			// }
			const user = await UserModel.findByIdAndUpdate(id, req.body, {
				new: true
			})
			console.log(user)
			const token = jwt.sign(
				{ username: user.username, id: user._id },
				process.env.JWT_KEY,
				{ expiresIn: "1h" }
			)
			console.log(token)
			const { password, ...rest } = user.toObject()
			res.status(200).json({ user: rest, token })
		} catch (error) {
			res.status(500).json(error)
		}
	} else {
		res.status(403).json("Access denied ! you can only update your own profile")
	}
}

//Delete user
export const deleteUser = async (req, res) => {
	const id = req.params.id
	const { _id, currentUserAdminStatus } = req.body

	if (_id === id || currentUserAdminStatus) {
		try {
			await UserModel.findByIdAndDelete(id)
			res.status(200).send("user deleted successfully")
		} catch (error) {
			res.status(500).json(error)
		}
	} else {
		res.status(403).json("Access Denied! you can only delete your profile")
	}
}

//Follow a User
export const followUser = async (req, res) => {
	const id = req.params.id
	const { _id } = req.body
	if (_id === id) {
		res.status(403).json("Action forbidden")
	} else {
		try {
			const followUser = await UserModel.findById(id) //leader
			const followingUser = await UserModel.findById(_id) //follower
			if (followingUser && followUser) {
				if (!followUser.followers.includes(_id)) {
					await followUser.updateOne({ $push: { followers: _id } })
					await followingUser.updateOne({ $push: { following: id } })
					res.status(200).json("User followed!")
				} else {
					res.status(403).json("you are already following this id")
				}
			} else {
				res.status(400).json("follower or leader doesn't exist")
			}
		} catch (error) {
			console.log(error)
			res.status(500).json(error)
		}
	}
}

// Unfollow a User
// changed
export const unfollowUser = async (req, res) => {
	const id = req.params.id
	const { _id } = req.body

	if (_id === id) {
		res.status(403).json("Action Forbidden")
	} else {
		try {
			const unFollowUser = await UserModel.findById(id)
			const unFollowingUser = await UserModel.findById(_id)
			if (unFollowUser && unFollowingUser) {
				if (unFollowUser.followers.includes(_id)) {
					await unFollowUser.updateOne({ $pull: { followers: _id } })
					await unFollowingUser.updateOne({ $pull: { following: id } })
					res.status(200).json("Unfollowed Successfully!")
				} else {
					res.status(403).json("You are not following this User")
				}
			} else {
				res.status(400).json("follower or leader doesn't exist")
			}
		} catch (error) {
			res.status(500).json(error)
		}
	}
}
