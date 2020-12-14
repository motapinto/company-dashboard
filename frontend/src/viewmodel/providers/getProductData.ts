import ProductInfo from "../../model/productInfo";
import { ProductData, ClientInfo } from "../../model/productData";
import {getProductInfo, getOrdersRequest, getHeader, getProductStock} from "./requests";

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

const getInfo = async (productKey: string): Promise<{p: ProductInfo, c: any, s: any}> => {
  const jsonProductInfo = await getProductInfo(productKey);

  const priceListLines = jsonProductInfo.data.priceListLines;

  const price =
    priceListLines.reduce((accumulator: number, priceListLine: any) => {
      return accumulator + priceListLine.priceAmount.amount;
    }, 0) / priceListLines.length;

  let totalSold = 0;
  const jsonOrders = await getOrdersRequest();

  const costumers: Array<any> = [];

  const sales: Array<any> = [];

  for (let i = 0; i < jsonOrders.data.length; i++) {
    const documentLines = jsonOrders.data[i].documentLines;

    for (let j = 0; j < documentLines.length; j++) {
      const documentLine = documentLines[j];

      if (productKey == documentLine.salesItem) {
        sales.push(documentLine);
        totalSold += documentLine.quantity;
        const costumer = costumers.find((value) => value.name === documentLine.buyerCustomerPartyName);
        if(costumer) {
          costumer.quantity += documentLine.quantity;
          costumer.amount += documentLine.lineExtensionAmount.amount * documentLine.quantity;
        } else {
          costumers.push({
            id: costumers.length,
            name: jsonOrders.data[i].buyerCustomerPartyName,
            quantity: documentLine.quantity,
            amount: documentLine.lineExtensionAmount.amount * documentLine.quantity
          })
        }
        break;
      }
    }
  }

  return {
    p: {
      productKey: productKey,
        name:
      capitalizeFirstLetter(jsonProductInfo.data.brand) +
      " " +
      separateProductKey(productKey),
        price: price,
      totalSold: totalSold,
      details: jsonProductInfo.data.complementaryDescription,
    },
    c: costumers,
    s: sales
  };
};

const getProfit = async (sales: any, year: any): Promise<{gp: Array<number>, np: Array<number>}> => {
  console.log(sales)
  const gp: number[] = [];
  const np: number[] = [];
  for (let i = 1; i <= 12; i++) {
    const month = `${year}-${ (i < 10 ? '0' : "") + i }`;

    gp.push(0);
    np.push(0);

    sales.forEach((salesItem: any) => {
      if(salesItem.deliveryDate.slice(0, 7) === month) {
        gp[i - 1] += salesItem.unitPrice.amount * .8;
        np[i - 1] += (salesItem.lineExtensionAmount.amount * .8 - salesItem.taxTotal.amount) * (100 - (salesItem.discount1 + salesItem.discount2 + salesItem.discount3)) / 100;
      }
    });
  }

  return {
    gp,
    np
  };
};

const getStock = async (productId: string): Promise<number> => {
  const currentStockInfo = (await getProductStock(productId))?.data;

  return currentStockInfo.materialsItemWarehouses.reduce((previous: number, current: any) => previous + current.stockBalance, 0);
};

export default async (productKey: string): Promise<ProductData> => {
  const year = 2020;
  const info = await getInfo(productKey);
  const stock = await getStock(productKey);
  const margins = await getProfit(info.s, year);
  const annualNetProfit = margins.np.reduce((previousValue: number, current) => previousValue + current, 0);

  return {
    year,
    info: info.p,
    gp: margins.gp,
    np: margins.np,
    clients: info.c,
    sold: info.p.totalSold,
    stock,
    annualNetProfit,
  };
};
