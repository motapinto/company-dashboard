import ProfitMargin from "./profitMargin";
import ProductInfo from "./productInfo";

export default interface SalesData {
  cogs: Array<number>,
  aov: Array<number>,
  profitMargin: ProfitMargin,
  salesRegion: Array<number>,
  topProducts: Array<ProductInfo>
}
