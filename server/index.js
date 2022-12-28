import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import * as dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import AuthRoute from "./Routes/AuthRoutes.js"
import UserRoute from "./Routes/UserRoute.js"
import PostRoute from "./Routes/PostRoute.js"
import UploadRoute from "./Routes/UploadRoute.js"
import ChatRoute from "./Routes/ChatRoute.js"
import MessageRoute from "./Routes/MessageRoute.js"
import passport from "passport"

import session from "express-session"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"

import User from "./Models/userModel.js"
//Routes

const app = express()

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "http://localhost:5001/auth/google/callback",
			userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
			scope: ["profile"],
			state: "pass-through value"
		},
		function (accessToken, refreshToken, profile, cb) {
			console.log(profile)
			User.findOrCreate(
				{
					username: profile.id,
					firstname: profile.name.givenName,
					lastname: profile.name.familyName,
					password: profile.id
				},
				function (err, user) {
					return cb(err, user)
				}
			)
		}
	)
)
passport.use(User.createStrategy())
passport.serializeUser(function (user, done) {
	done(null, user.id)
})
passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user)
	})
})
//Middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cookieParser())
dotenv.config()
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true
	})
)
mongoose.set("strictQuery", true)

app.use(
	session({
		secret: "this_is_a_secret",
		saveUninitialized: true,
		resave: false
		//store: pgSessionStorage,
		// rolling: true, // forces resetting of max age
		// cookie: {
		// 	maxAge: 360000,
		// 	secure: false // this should be true only when you don't want to show it for security reason
		// }
	})
)

app.use(passport.initialize())
app.use(passport.session())

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => app.listen(5001, () => console.log("Listening at port 5001")))
	.catch((error) => console.log(error))

// mongoose.set("useCreateIndex", true)

// to serve images for public
app.use(express.static("public"))
app.use("/images", express.static("images"))

// google login

app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }))
app.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		failureRedirect: "http://localhost:3000/auth"
	}),
	function (req, res) {
		// Successful authentication, redirect secrets.
		res.redirect("http://localhost:3000")
	}
)
app.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user
		})
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" })
	}
})
app.post("/logout", (req, res) => {
	req.session.destroy(function () {
		// res.redirect("/")
	})

	res.status(200).json("http://localhost:3000")
})
//usage of routes
app.use("/auth", AuthRoute)
app.use("/user", UserRoute)
app.use("/post", PostRoute)
app.use("/upload", UploadRoute)
app.use("/chat", ChatRoute)
app.use("/message", MessageRoute)
