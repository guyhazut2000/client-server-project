import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://stark-harbor-89554.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
