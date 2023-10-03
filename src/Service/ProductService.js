import axios from "../axios";
export const getAllProducts = () => {
  return axios.get("/products/all");
};

export const getProductsByCategory = (category) => {
  return axios.get(`/products/all/${category}`);
};

export const getProductsBestSeller = (category) => {
  let query = "";
  if (!!category) {
    query = category;
  }
  return axios.get(`/products/best-seller?category=${query}`);
};

export const getProductByProductCode = (productCode) => {
  return axios.get(`/products/get-product-by-productCode/${productCode}`);
};
