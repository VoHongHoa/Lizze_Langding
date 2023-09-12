import axios from "../axios";
export const getAllColors = () => {
  return axios.get("/colors/all");
};
