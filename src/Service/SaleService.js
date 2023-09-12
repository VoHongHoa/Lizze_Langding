import axios from "../axios";
export const createInvoice = (data) => {
  return axios.post("/invoice/create", data);
};

export const getInvoiceByCustomerCode = (customerCode) => {
  return axios.get(`/invoice/${customerCode}`);
};

export const getDetailInvoice = (invoiceHeaderCode) => {
  return axios.get(`/invoice/detail-invoice/${invoiceHeaderCode}`);
};
