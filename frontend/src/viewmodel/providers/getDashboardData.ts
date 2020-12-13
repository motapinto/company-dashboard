import dashboardData from "../../model/dashboardData";
import OverviewKpis from "../../model/overviewKpis";
import getBalanceSheet from "./shared/getBalanceSheet";
import getTopProducts from "./shared/getTopProducts";
import { Data } from "../../model/procurementData";
import { getSalesRegion } from "./shared/getSalesByRegion";
import { getMonthlySales, getHeader, getSGT } from "./requests";

const getSales = async (): Promise<Data> => {
  const salesByRegionData = (await getMonthlySales()).data;
  return {
    label: "Monthly Sales",
    data: salesByRegionData.monthlySales,
  };
};

const SGT = async (): Promise<number> => {
  const request = await getSGT();
  return request.data.grossTotal;
};

const getOverviewKpis = async (): Promise<OverviewKpis> => {
  return {
    sgt: 2416353,
    snt: 2313223,
    gpm: 34.23,
    egr: 98.23,
    rgr: 22.12,
    npm: 50.22,
  };
};

export default async (): Promise<dashboardData> => {
  return {
    year: await getHeader(),
    topProducts: await getTopProducts(),
    balanceSheet: await getBalanceSheet(),
    overviewKpis: await getOverviewKpis(),
    sales: await getSales(),
    regionSales: await getSalesRegion(),
  };
};
