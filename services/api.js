import axios from "axios";
export default () => {
  return axios.create({
    baseURL: process.env.BACKEND_URL || "http://192.168.0.102:3000/api/v1/",
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
