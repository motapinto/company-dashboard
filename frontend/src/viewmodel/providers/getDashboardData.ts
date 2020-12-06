import dashboardData from "../../model/dashboardData";
import OverviewKpis from "../../model/overviewKpis";
import RegionSales from "../../model/regionSales";
import getBalanceSheet from "./shared/getBalanceSheet";
import getTopProducts from "./shared/getTopProducts";
import { Data } from "../../model/procurementData";
const axios = require("axios").default;

const url = `${process.env.REACT_APP_URL}/api/${process.env.REACT_APP_TENANT}/${process.env.REACT_APP_ORGANIZATION}`;
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.REACT_APP_TOKEN}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

const getRegionSales = async (year: number): Promise<RegionSales> => {
  return {
    labels: ["America", "China", "Europe", "Australia", "Africa"],
    data: [40, 65, 42, 22, 15],
  };
};

const getSales = async (year: number): Promise<Data> => {
  return {
    label: "Montly Sales",

    data: [
      2323323,
      2212122,
      2312312,
      1211221,
      4312232,
      1112312,
      7512321,
      5542565,
      9523534,
      4322423,
      3222423,
      4324322,
    ],
  };
};

const getOverviewKpis = async (year: number): Promise<OverviewKpis> => {
  return {
    sgt: 2131231,
    snt: 2313223,
    gpm: 34.23,
    egr: 98.23,
    rgr: 22.12,
    npm: 50.22,
  };
};

export default async (year: number): Promise<dashboardData> => {
  return {
    topProducts: await getTopProducts(year),
    balanceSheet: await getBalanceSheet(year),
    overviewKpis: await getOverviewKpis(year),
    sales: await getSales(year),
    regionSales: await getRegionSales(year),
  };
};
