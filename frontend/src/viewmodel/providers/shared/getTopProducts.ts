import TopProduct from "../../../model/topProduct";
const axios = require("axios").default;

const url = `${process.env.REACT_APP_URL}/api/${process.env.REACT_APP_TENANT}/${process.env.REACT_APP_ORGANIZATION}`;
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.REACT_APP_TOKEN}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

const getTopProducts = async (year: number): Promise<Array<TopProduct>> => {
  return [
    {
      id: 0,
      name: "Tesla Model S",
      price: "70.000 $",
      totalSold: "94.000",
      status: "Active",
    },
    {
      id: 1,
      name: "Tesla Model Y",
      price: "45.000 $",
      totalSold: "89.000",
      status: "Inactive",
    },
    {
      id: 2,
      name: "Tesla Model 3",
      price: "35.000 $",
      totalSold: "77.000",
      status: "Active",
    },
    {
      id: 3,
      name: "Tesla Model X",
      price: "120.000 $",
      totalSold: "54.500",
      status: "Banned",
    },
    {
      id: 4,
      name: "Tesla Roadster",
      price: "200.000 $",
      totalSold: "0",
      status: "Pending",
    },
    {
      id: 5,
      name: "Cybertruck",
      price: "39.900 $",
      totalSold: "0",
      status: "Pending",
    },
  ]
}

export default getTopProducts;