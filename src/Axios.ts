import axios from "axios"

export default axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://api.agiraudlanza.juniorisep.com",
  headers: { "Content-Type" : "application/json"},
  withCredentials: true,
})
