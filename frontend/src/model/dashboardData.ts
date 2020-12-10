import BalanceSheet from "./balanceSheet";
import OverviewKpis from "./overviewKpis";
import { Data } from "./procurementData";
import ProductInfo from "./productInfo";
import SalesRegionData from "./salesRegionData";

export default interface DashBoard {
  year: number
  topProducts: Array<ProductInfo>;
  balanceSheet: BalanceSheet;
  overviewKpis: OverviewKpis;
  sales: Data;
  regionSales: SalesRegionData;
}
