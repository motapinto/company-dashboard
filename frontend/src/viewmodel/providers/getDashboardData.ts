import dashboardData from "../../model/dashboardData";
import OverviewKpis from "../../model/overviewKpis";
import RegionSales from "../../model/regionSales";
import getBalanceSheet from "./shared/getBalanceSheet";
import getTopProducts from "./shared/getTopProducts";
import { Data } from "../../model/procurementData";
import { getSalesRegion } from "./shared/getSalesByRegion";
import { getMonthlySales } from "./requests";
const axios = require("axios").default;

const url = `${process.env.REACT_APP_URL}/api/${process.env.REACT_APP_TENANT}/${process.env.REACT_APP_ORGANIZATION}`;
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.REACT_APP_TOKEN}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

const getSales = async (year: number): Promise<Data> => {
  const salesByRegionData = (await getMonthlySales(year)).data;
  return {
    label: "Montly Sales",
    data: salesByRegionData.monthlySales,
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
    regionSales: await getSalesRegion(year),
  };
};
