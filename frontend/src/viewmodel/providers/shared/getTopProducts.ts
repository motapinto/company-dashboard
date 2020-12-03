import ProductInfo from "../../../model/productInfo";
const axios = require("axios").default;

const url = `${process.env.REACT_APP_URL}/api/${process.env.REACT_APP_TENANT}/${process.env.REACT_APP_ORGANIZATION}`;
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.REACT_APP_TOKEN}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

const getTopProducts = async (year: number): Promise<Array<ProductInfo>> => {
  return [
    {
      id: 0,
      name: "Tesla Model S",
      price: 70000,
      totalSold: 94000,
      status: "Active",
    },
    {
      id: 1,
      name: "Tesla Model Y",
      price: 45000,
      totalSold: 89000,
      status: "Inactive",
    },
    {
      id: 2,
      name: "Tesla Model 3",
      price: 35000,
      totalSold: 77000,
      status: "Active",
    },
    {
      id: 3,
      name: "Tesla Model X",
      price: 120000 ,
      totalSold: 54500,
      status: "Banned",
    },
    {
      id: 4,
      name: "Tesla Roadster",
      price: 200000,
      totalSold: 0,
      status: "Pending",
    },
    {
      id: 5,
      name: "Cybertruck",
      price: 39900,
      totalSold: 0,
      status: "Pending",
    },
  ]
}

export default getTopProducts;