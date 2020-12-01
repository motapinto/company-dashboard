import ProductInfo from "./productInfo";
import ClientsData from "./clientsData";

export default interface ProductData {
  info: ProductInfo;
  gpm: Array<number>,
  npm: Array<number>,
  clients: Array<ClientsData>;
  sold: number;
  stock: number;
  annualNetProfit: number
}
