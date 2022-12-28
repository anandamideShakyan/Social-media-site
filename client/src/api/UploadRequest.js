import axios from "axios"
// const API = axios.create({ baseURL: "http://localhost:5001" })

axios.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`
	}

	return req
})

export const uploadImage = (data) => axios.post("/upload", data)

export const uploadPost = (data) => axios.post("/post", data)
