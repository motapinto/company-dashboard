export default interface ProductInfo {
  id: string;
  name: string;
  price: number;
  totalSold: number;
  status?: string;
  details?: string;
}
