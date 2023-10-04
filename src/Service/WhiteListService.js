import axios from "../axios";
// export const getCustomerComment = (customerCode) => {
//   return axios.get("/products/all");
// };

export const addNewWhiteListProduct = (data) => {
  return axios.post("/whitelist", data);
};

export const removeNewWhiteListProduct = (whiteListId) => {
  return axios.delete(`/whitelist/${whiteListId}`);
};

export const getAllWhiteListProduct = () => {
  return axios.get("/whitelist");
};
