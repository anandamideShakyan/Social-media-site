import axios from "axios"

// const API = axios.create({ baseURL: "http://localhost:5001" })

export const userChats = (id) => axios.get(`/chat/${id}`)
