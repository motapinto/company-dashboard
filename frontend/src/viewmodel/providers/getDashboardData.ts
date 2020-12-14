import dashboardData from "../../model/dashboardData";
import OverviewKpis from "../../model/overviewKpis";
import getBalanceSheet from "./shared/getBalanceSheet";
import getTopProducts from "./shared/getTopProducts";
import { Data } from "../../model/procurementData";
import { getSalesRegion } from "./shared/getSalesByRegion";
import { getMonthlySales, getHeader, getDashboardKPI } from "./requests";

const getSales = async (): Promise<Data> => {
  const salesByRegionData = (await getMonthlySales()).data;
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
    egr: dashboard.egr,
    rgr: dashboard.rgr,
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
