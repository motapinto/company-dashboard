export default interface ProductInfo {
  id: number;
  name: string;
  price: number;
  totalSold: number;
  status?: string;
  details?: string;
}
