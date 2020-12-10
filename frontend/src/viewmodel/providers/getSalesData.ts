import SalesData from "../../model/salesData";
import getProfitMargin from "./shared/getProfitMargin";
import getTopProducts from "./shared/getTopProducts";
import { getSalesRegion } from "./shared/getSalesByRegion";
import { getAOV, getHeader } from "./requests";

const axios = require("axios").default;

const url = `${process.env.REACT_APP_URL}/api/${process.env.REACT_APP_TENANT}/${process.env.REACT_APP_ORGANIZATION}`;
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.REACT_APP_TOKEN}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

const assembleCOGS = async (): Promise<Array<number>> => {
  return [78, 81, 80, 45, 34, 12, 40, 55, 67, 89, 76, 56];
};

const assembleAOV = async (): Promise<Array<number>> => {
  const request = await getAOV();
  return request.data.aov;
};

export default async (): Promise<SalesData> => {
  return {
    year: await getHeader(),
    cogs: await assembleCOGS(),
    aov: await assembleAOV(),
    profitMargin: await getProfitMargin(),
    salesRegion: await getSalesRegion(),
    topProducts: await getTopProducts(),
  };
};
