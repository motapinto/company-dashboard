import ProductInfo from "./productInfo";
import ClientsData from "./clientsData";
import NetGrossProfitData from "./NetGrossProfitData";

export default interface ProductData {
  productInfo: ProductInfo;
  purchaseOrder: NetGrossProfitData;
  clientsData: Array<ClientsData>;
  unitsSold: number;
  productNetProfit: number;
  unitStock: number;
}
