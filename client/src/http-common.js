import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://project-clientserver.herokuapp.com/api"
      : "http://localhost:5000/api",
  headers: {
    "Content-type": "application/json",
  },
});
