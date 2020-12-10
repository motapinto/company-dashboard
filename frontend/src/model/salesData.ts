import ProfitMargin from "./profitMargin";
import ProductInfo from "./productInfo";
import SalesRegionData from "./salesRegionData";

export default interface SalesData {
  year: number,
  cogs: Array<number>,
  aov: Array<number>,
  profitMargin: ProfitMargin,
  salesRegion: SalesRegionData,
  topProducts: Array<ProductInfo>
}
