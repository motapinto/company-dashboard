import ProductInfo from "../../model/productInfo";
import { ProductData, ClientInfo } from "../../model/productData";
import { getProductInfo, getOrdersRequest } from "./requests";
import { string } from "prop-types";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function separateProductKey(productKey: string) {
  let productKeySplit = "";
  productKey.split("_").forEach(function (item) {
    productKeySplit += capitalizeFirstLetter(item) + " ";
  });
  return productKeySplit;
}

const getInfo = async (
  productKey: string,
  year: number
): Promise<ProductInfo> => {
  console.log(productKey);
  console.log(year);
  const jsonProductInfo = await getProductInfo(productKey, year);

  console.log(jsonProductInfo);

  const priceListLines = jsonProductInfo.data.priceListLines;

  const price =
    priceListLines.reduce((accumulator: number, priceListLine: any) => {
      return accumulator + priceListLine.priceAmount.amount;
    }, 0) / priceListLines.length;

  let totalSold = 0;
  const jsonOrders = await getOrdersRequest(year);
  console.log("here");
  console.log(jsonOrders);

  for (let i = 0; i < jsonOrders.data.length; i++) {
    const documentLines = jsonOrders.data[i].documentLines;

    for (let j = 0; j < documentLines.length; j++) {
      const documentLine = documentLines[j];

      if (productKey == documentLine.salesItem) {
        totalSold += documentLine.quantity;
        break;
      }
    }
  }

  return {
    productKey: productKey,
    name:
      capitalizeFirstLetter(jsonProductInfo.data.brand) +
      " " +
      separateProductKey(productKey),
    price: price,
    totalSold: totalSold,
    details: jsonProductInfo.data.complementaryDescription,
  };
};

const getGrossProfitMargin = async (year: number): Promise<Array<number>> => {
  return [98, 166, 159, 122, 109, 91, 139, 99, 140, 193, 79, 160];
};

const getNetProfitMargin = async (year: number): Promise<Array<number>> => {
  return [86, 82, 92, 81, 86, 88, 80, 92, 88, 84, 46, 65];
};

const getClients = async (
  productId: string,
  year: number
): Promise<Array<ClientInfo>> => {
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

const getSold = async (productId: string, year: number): Promise<number> => {
  return 2000;
};

const getStock = async (productId: string, year: number): Promise<number> => {
  return 2000;
};

const getAnnualNetProfit = async (
  productId: string,
  year: number
): Promise<number> => {
  return 2000;
};

export default async (
  productKey: string,
  year: number
): Promise<ProductData> => {
  return {
    info: await getInfo(productKey, year),
    gpm: await getGrossProfitMargin(year),
    npm: await getNetProfitMargin(year),
    clients: await getClients(productKey, year),
    sold: await getSold(productKey, year),
    stock: await getStock(productKey, year),
    annualNetProfit: await getAnnualNetProfit(productKey, year),
  };
};
