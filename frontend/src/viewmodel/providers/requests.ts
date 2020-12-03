const axios = require("axios").default;

const url = `${process.env.REACT_APP_URL}/api/${process.env.REACT_APP_TENANT}/${process.env.REACT_APP_ORGANIZATION}`;
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.REACT_APP_TOKEN}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

export const getProductsRequest = async (year: number): Promise<any> => {
  return await axios.get(url + "/salescore/salesitems");
}

export const getOrdersRequest = async (year: number): Promise<any> => {
  return await axios.get(url + "/sales/orders");
}
