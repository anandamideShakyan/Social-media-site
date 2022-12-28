import mongoose from "mongoose"
import passportLocalMongoose from "passport-local-mongoose"
import findOrCreate from "mongoose-findorcreate"

const UserSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		firstname: {
			type: String,
			required: true
		},
		lastname: {
			type: String,
			required: true
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
		profilePicture: String,
		coverPicture: String,
		about: String,
		livesIn: String,
		worksAt: String,
		relationship: String,
		country: String,
		followers: [],
		following: []
	},
	{ timestamps: true }
)

UserSchema.plugin(passportLocalMongoose)
UserSchema.plugin(findOrCreate)
const UserModel = mongoose.model("Users", UserSchema)
export default UserModel
