import axios from "axios";

const API_URL = "http://localhost:4000/api/v1";

const signup = (name, username, email, password, grade) => {
  return axios.put(API_URL + "/auth/signup", {
    name,
    username,
    email,
    password,
    grade
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "/auth/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  signup,
  login,
  logout,
};
