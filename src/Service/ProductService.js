import axios from "../axios";
export const getAllProducts = () => {
  return axios.get("/products/all");
};

export const getProductsByCategory = (category) => {
  return axios.get(`/products/all/${category}`);
};
