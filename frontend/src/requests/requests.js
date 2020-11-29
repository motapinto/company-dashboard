const axios = require("axios").default;

const url = `${process.env.REACT_APP_URL}/api/${process.env.REACT_APP_TENANT}/${process.env.REACT_APP_ORGANIZATION}`;
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.REACT_APP_TOKEN}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

export const getOrders = async () => {
  try {
    const res = await axios.get(url + "/sales/orders");
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

export const getExpenses = async () => {
  try {
    const res = await axios.get(url + "/invoiceReceipt/expenses");
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};
