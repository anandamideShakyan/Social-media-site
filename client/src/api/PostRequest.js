import axios from "axios"

// const API = axios.create({ baseURL: "http://localhost:5001" })

export const getTimelinePosts = (id) => axios.get(`/post/${id}/timeline`, id)
export const likePost = (id, user_id) =>
	axios.post(`/post/${id}/like`, { userId: user_id })
