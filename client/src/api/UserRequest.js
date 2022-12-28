import axios from "axios"
// const API  = axios.create({ baseURL: "http://localhost:5001" })
axios.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`
	}

	return req
})
export const getUser = (id) => axios.get(`/user/${id}`)
export const getUsers = () => axios.get(`/user`)

export const updateUser = (id, data) => axios.put(`/user/${id}`, data)

export const followUser = (id, data) => axios.put(`/user/${id}/follow`, data)
export const unfollowUser = (id, data) =>
	axios.put(`/user/${id}/unfollow`, data)
