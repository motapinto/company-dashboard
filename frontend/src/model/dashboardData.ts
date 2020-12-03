import BalanceSheet from "./balanceSheet";
import TopProduct from "./topProduct";

export default interface DashBoard {
  topProducts: Array<TopProduct>,
  balanceSheet: BalanceSheet,
}