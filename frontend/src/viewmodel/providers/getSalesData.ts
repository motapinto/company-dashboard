import SalesData from "../../model/salesData";
import getProfitMargin from "./shared/getProfitMargin";
import getTopProducts from "./shared/getTopProducts";
const axios = require("axios").default;

const url = `${process.env.REACT_APP_URL}/api/${process.env.REACT_APP_TENANT}/${process.env.REACT_APP_ORGANIZATION}`;
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.REACT_APP_TOKEN}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

const getCOGS = async (year: number): Promise<Array<number>> => {
  return [78, 81, 80, 45, 34, 12, 40, 55, 67, 89, 76, 56];
};

const getAOV = async(year: number): Promise<Array<number>> => {
  return [78, 81, 80, 45, 34, 12, 40, 55, 67, 89, 76, 56];
}

const getSalesRegion = async(year: number): Promise<Array<number>> => {
  return [40, 65, 42, 22, 15];
}

export default async (year: number): Promise<SalesData> => {
  return {
    cogs: await getCOGS(year),
    aov: await getAOV(year),
    profitMargin: await getProfitMargin(year),
    salesRegion: await getSalesRegion(year),
    topProducts: await getTopProducts(year),
  };
};
