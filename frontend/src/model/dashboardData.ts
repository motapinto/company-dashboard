import BalanceSheet from "./balanceSheet";
import ProductInfo from "./productInfo";

export default interface DashBoard {
  topProducts: Array<ProductInfo>,
  balanceSheet: BalanceSheet,
}