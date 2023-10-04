import axios from "../axios";
// export const getCustomerComment = (customerCode) => {
//   return axios.get("/products/all");
// };

export const createReview = (data) => {
  return axios.post("/reviews", data);
};

export const getCustomerReview = (productCode) => {
  return axios.get(`/reviews/get-customer-review/${productCode}`);
};

export const getAllCustomerRating = (productCode) => {
  return axios.get(`/reviews/get-all-rating/${productCode}`);
};

export const removeReview = (reviewId) => {
  return axios.delete(`/reviews/${reviewId}`);
};

export const updateReview = (reviewId, dataUpdate) => {
  return axios.put(`/reviews/${reviewId}`, dataUpdate);
};
