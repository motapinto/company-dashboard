import ProfitMargin from "./profitMargin";
import TopProduct from "./topProducts";

export default interface SalesData {
  cogs: Array<number>,
  aov: Array<number>,
  profitMargin: ProfitMargin,
  salesRegion: Array<number>,
  topProducts: Array<TopProduct>
}
