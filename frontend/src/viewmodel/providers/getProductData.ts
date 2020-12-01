import SalesData from "../../model/salesData";
import ProductInfo from "../../model/productInfo";
import { cilEthernet } from "@coreui/icons";
import ClientsData from "../../model/clientsData";
import NetGrossProfitData from "../../model/NetGrossProfitData";
import ProductData from "../../model/productData";

const getProductInfo = async (
  productId: string,
  year: number
): Promise<ProductInfo> => {
  return {
    id: productId,
    name: "Tesla Model S",
    supplier: "Tesla",
    cost: 70.0,
    profit: 24.0,
    details:
      "Model S is built from the ground up as an electric vehicle, with high-strength architecture and a floor-mounted battery pack allowing for incredible impact protection.",
  };
};

const getClientsData = async (
  productId: string,
  year: number
): Promise<Array<ClientsData>> => {
  return [
    {
      id: 0,
      name: "José",
      quantity: 3000,
      amount: 100.0,
    },
    {
      id: 1,
      name: "Luís",
      quantity: 2152,
      amount: 89.0,
    },
    {
      id: 2,
      name: "Carlos",
      quantity: 1632,
      amount: 76.0,
    },
    {
      id: 3,
      name: "Martim",
      quantity: 1543,
      amount: 70.0,
    },
    {
      id: 4,
      name: "Kiko",
      quantity: 1364,
      amount: 67.0,
    },
  ];
};

const getNetGrossProfit = async (
  productId: string,
  year: number
): Promise<NetGrossProfitData> => {
  return {
    netProfit: [123, 31, 45, 123, 25, 42, 23, 83, 112, 32, 180, 91],
    grossProfit: [91, 88, 79, 87, 93, 97, 85, 82, 79, 86, 94, 86],
  };
};

const getUnitsSold = async (
  productId: string,
  year: number
): Promise<number> => {
  return 2000;
};

const getProductNetProfit = async (
  productId: string,
  year: number
): Promise<number> => {
  return 2000;
};

const getUnitStock = async (
  productId: string,
  year: number
): Promise<number> => {
  return 2000;
};

export default async (
  productId: string,
  year: number
): Promise<ProductData> => {
  return {
    productInfo: await getProductInfo("modelS", 2019),
    purchaseOrder: await getNetGrossProfit(productId, year),
    clientsData: await getClientsData(productId, year),
    unitsSold: await getUnitsSold(productId, year),
    productNetProfit: await getProductNetProfit(productId, year),
    unitStock: await getUnitStock(productId, year),
  };
};
