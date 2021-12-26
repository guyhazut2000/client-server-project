import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "client-server-2021-project-app.herokuapp.com:5000/api",
  headers: {
    "Content-type": "application/json",
  },
});
