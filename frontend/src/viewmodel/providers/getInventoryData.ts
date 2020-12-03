import InventoryData from "../../model/inventoryData";
import getTopProducts from "./shared/getTopProducts";
const axios = require("axios").default;

const url = `${process.env.REACT_APP_URL}/api/${process.env.REACT_APP_TENANT}/${process.env.REACT_APP_ORGANIZATION}`;
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.REACT_APP_TOKEN}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

const getDaysToSell = async (year: number): Promise<number> => {
  return 20999;
};

const getAssets = async (year: number): Promise<number> => {
  return 20;
};

const getReplaced = async (year: number): Promise<Array<number>> => {
  return [20, 232, 232, 233, 232, 554, 316, 131, 32, 23, 231, 132];
};

const getSold = async (year: number): Promise<Array<number>> => {
  return [20, 232, 232, 233, 232, 554, 316, 131, 32, 23, 231, 132];
};

const getSoldTotal = async (year: number): Promise<number> => {
  return 20;
};

const getReplacedTotal = async (year: number): Promise<number> => {
  return 20;
};

const getmonthlyAvgInv = async (year: number): Promise<Array<number>> => {
  return [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11];
};

export default async (year: number): Promise<InventoryData> => {
  return {
    daysToSell: await getDaysToSell(year),
    assets: await getAssets(year),
    replacedTotal: await getReplacedTotal(year),
    replaced: await getReplaced(year),
    sold: await getSold(year),
    monthlyAvgInv: await getmonthlyAvgInv(year),
    soldTotal: await getSoldTotal(year),
    topProducts: await getTopProducts(year),
  };
};
