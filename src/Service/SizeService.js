import axios from "../axios";
export const getAllSizes = () => {
  return axios.get("/sizes/all");
};
