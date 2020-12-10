import TopProduct from "./productInfo";

export default interface InventoryData {
  year: number
  daysToSell: number;
  assets: number;
  soldTotal: number;
  replacedTotal: number;
  replaced: Array<number>;
  sold: Array<number>;
  monthlyAvgInv: Array<number>;
  topProducts: Array<TopProduct>;
}
