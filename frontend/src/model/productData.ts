import ProductInfo from "./productInfo";

export interface ClientInfo {
  id: number;
  name: string;
  quantity: number;
  amount: number;
}

export interface ProductData {
  year: number,
  info: ProductInfo;
  gp: Array<number>,
  np: Array<number>,
  clients: Array<ClientInfo>;
  sold: number;
  stock: number;
  annualNetProfit: number
}
