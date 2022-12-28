import "./App.css"
import Auth from "./pages/Auth/Auth"
import Home from "./pages/home/Home"
import Chat from "./pages/Chat/Chat"
import Profile from "./pages/Profile/Profile"
import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { googleLogin } from "./actions/AuthAction"
import axios from "axios"
function App() {
	const user = useSelector((state) => state.authReducer.authData)
	const dispatch = useDispatch()
	useEffect(() => {
		const getUser = async () => {
			try {
				const url = `/login/success`
				const { data } = await axios.get(url, { withCredentials: true })
				console.log(data)
				const { password, ...rest } = data.user
				dispatch(googleLogin({ user: rest }))
			} catch (err) {
				console.log(err)
			}
		}
		getUser()
	}, [])
	return (
		<div className="App">
			<div className="blur" style={{ top: "-18%", right: "0" }}></div>
			<div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
			<Routes>
				<Route
					path="/"
					element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
				/>
				<Route
					path="/home"
					element={user ? <Home /> : <Navigate to="../auth" />}
				/>
				<Route
					path="/auth"
					element={user ? <Navigate to="../home" /> : <Auth />}
				/>
				<Route
					path="/chat"
					element={!user ? <Navigate to="../auth" /> : <Chat />}
				/>
				<Route
					path="/profile/:id"
					element={user ? <Profile /> : <Navigate to="../auth" />}
				/>
			</Routes>
		</div>
	)
}

export default App
