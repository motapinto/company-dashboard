export default interface ProductInfo {
  productKey: string;
  name: string;
  price: number;
  totalSold: number;
  status?: string;
  details?: string;
}
