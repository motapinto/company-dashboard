import TopProduct from "./topProducts";

export default interface SalesData {
  cogs: Array<number>,
  aov: Array<number>,
  gpm: Array<number>,
  npm: Array<number>,
  salesR: Array<number>,
  topProd: Array<TopProduct>
}
