import axios from "../axios";
export const customerSignIn = (data) => {
  return axios.post(`/auths/customer-sign-in`, data);
};
export const customerSignUp = (data) => {
  return axios.post(`/auths/customer-sign-up`, data);
};
