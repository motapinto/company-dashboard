import dashboardData from "../../model/dashboardData";
import getBalanceSheet from "./shared/getBalanceSheet";
import getTopProducts from "./shared/getTopProducts";
const axios = require("axios").default;

const url = `${process.env.REACT_APP_URL}/api/${process.env.REACT_APP_TENANT}/${process.env.REACT_APP_ORGANIZATION}`;
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.REACT_APP_TOKEN}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

export default async (year: number): Promise<dashboardData> => {
  return {
    topProducts: await getTopProducts(year),
    balanceSheet: await getBalanceSheet(year),
  };
};