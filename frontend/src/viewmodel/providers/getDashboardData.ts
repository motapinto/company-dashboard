import dashboardData from "../../model/dashboardData";
import OverviewKpis from "../../model/overviewKpis";
import getBalanceSheet from "./shared/getBalanceSheet";
import getTopProducts from "./shared/getTopProducts";
import { Data } from "../../model/procurementData";
import { getSalesRegion } from "./shared/getSalesByRegion";
import { getMonthlySales, getHeader, getDashboardKPI } from "./requests";

const getSales = async (): Promise<Data> => {
  const salesByRegionData = (await getMonthlySales()).data;

  let total = 0;
  for (let i = 0; i < 12; i++) {
    total += salesByRegionData.monthlySales[i];
  }
  console.log(total);
  return {
    label: "Monthly Sales",
    data: salesByRegionData.monthlySales,
  };
};

const getOverviewKpis = async (): Promise<OverviewKpis> => {
  let dashboard = (await getDashboardKPI())?.data;

  return {
    sgt: dashboard.grossTotal,
    snt: dashboard.netTotal,
    gpm: dashboard.gpm,
    netIncome: dashboard.netIncome,
    ebitda: dashboard.ebitda,
    npm: dashboard.npm,
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
