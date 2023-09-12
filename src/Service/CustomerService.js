import axios from "../axios";

export const updateCustomerInfor = (customerCode, data) => {
  return axios.patch(`/customers/${customerCode}`, data);
};
export const getCustomerInfor = (customerCode) => {
  return axios.get(`/customers/${customerCode}`);
};
