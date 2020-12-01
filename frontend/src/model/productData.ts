import ProductInfo from "./productInfo";
import { cilEthernet } from "@coreui/icons";
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
