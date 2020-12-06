import BalanceSheet from "./balanceSheet";
import OverviewKpis from "./overviewKpis";
import { Data } from "./procurementData";
import ProductInfo from "./productInfo";
import RegionSales from "./regionSales";

export default interface DashBoard {
  topProducts: Array<ProductInfo>;
  balanceSheet: BalanceSheet;
  overviewKpis: OverviewKpis;
  sales: Data;
  regionSales: RegionSales;
}
