import axios from "axios"

// const API = axios.create({ baseURL: "http://localhost:5001" })

export const addMessage = (message) => axios.post(`/message`, message)
export const getMessages = (id) => axios.get(`/message/${id}`)
