import InventoryData from "../../model/inventoryData";
import getTopProducts from "./shared/getTopProducts";
import {getAllProducts, getHeader} from "./requests"

const getDaysToSell = async (): Promise<number> => {
  return 20999;
};

const getAssets = async (): Promise<number> => {
  return 20;
};

const getReplaced = async (): Promise<Array<number>> => {
  return [20, 232, 232, 233, 232, 554, 316, 131, 32, 23, 231, 132];
};

const getSold = async (): Promise<Array<number>> => {
  return [20, 232, 232, 233, 232, 554, 316, 131, 32, 23, 231, 132];
};

const getSoldTotal = async (): Promise<number> => {
  return 20;
};

const getReplacedTotal = async (): Promise<number> => {
  return 20;
};

const getmonthlyAvgInv = async (): Promise<Array<number>> => {
  return [40000000, 20000000, 12000000, 39000000, 10000000, 40000000, 39000000, 80000000, 40000000, 20000000, 12000000, 35611601.40];
};

export default async (): Promise<InventoryData> => {
  const products = await getAllProducts();

  console.log(products?.data)

  return {
    year: await getHeader(),
    daysToSell: await getDaysToSell(),
    assets: products?.data.reduce((accumulator: any, current: any) => accumulator + current.materialsItemWarehouses.reduce((previous: any, currentWh: any) => previous + currentWh.inventoryBalance.amount, 0), 0),
    replacedTotal: await getReplacedTotal(),
    replaced: await getReplaced(),
    sold: await getSold(),
    monthlyAvgInv: await getmonthlyAvgInv(),
    soldTotal: await getSoldTotal(),
    topProducts: await getTopProducts(),
  };
};
