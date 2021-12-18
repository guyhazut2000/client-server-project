import http from "../http-common";

class UserDataService {
  // get user info by email.
  getUserByEmail(email) {
    return http.get(`/users/${email}`);
  }
  loginUser(data) {
    return http.post("/users/login", data);
  }
  createNewUser(data) {
    return http.put("/users/add-user", data);
  }
  getUserPasswordByEmail(email) {
    return http.get(`/users/forgot-password/${email}`);
  }
}

export default new UserDataService();
