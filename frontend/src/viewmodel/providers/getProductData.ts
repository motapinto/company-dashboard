import ProductInfo from "../../model/productInfo";
import ClientsData from "../../model/clientsData";
import ProductData from "../../model/productData";

const getInfo = async (
  productId: string,
  year: number
): Promise<ProductInfo> => {
  return {
    id: "1111",
    name: "Tesla Model S",
    supplier: "Tesla",
    cost: 70.0,
    profit: 24.0,
    details:
      "Model S is built from the ground up as an electric vehicle, with high-strength architecture and a floor-mounted battery pack allowing for incredible impact protection.",
  };
};

const getGrossProfitMargin = async(year: number): Promise<Array<number>> => {
  return [98, 166, 159, 122, 109, 91, 139, 99, 140, 193, 79, 160];
}

const getNetProfitMargin = async(year: number): Promise<Array<number>> => {
  return [86, 82, 92, 81, 86, 88, 80, 92, 88, 84, 46, 65];
}

const getClients = async (
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

const getSold = async (
  productId: string,
  year: number
): Promise<number> => {
  return 2000;
};

const getStock = async (
  productId: string,
  year: number
): Promise<number> => {
  return 2000;
};

const getAnnualNetProfit = async (
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
    info: await getInfo(productId, year),
    gpm: await getGrossProfitMargin(year),
    npm: await getNetProfitMargin(year),
    clients: await getClients(productId, year),
    sold: await getSold(productId, year),
    stock: await getStock(productId, year),
    annualNetProfit: await getAnnualNetProfit(productId, year),
  };
};
