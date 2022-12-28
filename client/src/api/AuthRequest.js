import axios from "axios"

// const API = axios.create({ baseURL: "http://localhost:5001" })

export const logIn = (formData) => axios.post("/auth/login", formData)
export const signUp = (formData) => axios.post("/auth/register", formData)
export const clearCookie = () =>
	axios.post(
		"/logout",
		{},
		{
			withCredentials: true
		}
	)
