import ProfitMargin from "./profitMargin";
import ProductInfo from "./productInfo";
import SalesRegionData from "./salesRegionData";

export default interface SalesData {
  cogs: Array<number>,
  aov: Array<number>,
  profitMargin: ProfitMargin,
  salesRegion: SalesRegionData,
  topProducts: Array<ProductInfo>
}
