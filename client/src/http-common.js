import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://stark-harbor-89554/api.herokuapp.com",
  headers: {
    "Content-type": "application/json",
  },
});
