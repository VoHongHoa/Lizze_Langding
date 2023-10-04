import axios from "../axios";

export const createRating = (data) => {
  return axios.post("/rating", data);
};

export const getCustomerRating = (productCode) => {
  return axios.get(`/rating/get-customer-rating/${productCode}`);
};

export const getProductRatingValue = (productCode) => {
  return axios.get(`/rating/get-product-rating/${productCode}`);
};

export const getProductRatingReport = (productCode) => {
  return axios.get(`/rating/get-product-rating-report/${productCode}`);
};
