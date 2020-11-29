import SalesData from "../../model/salesData";
import TopProduct from "../../model/topProducts";

const getCOGS = async (year: number): Promise<Array<number>> => {
  return [78, 81, 80, 45, 34, 12, 40, 55, 67, 89, 76, 56];
};

const getAOV = async(year: number): Promise<Array<number>> => {
  return [78, 81, 80, 45, 34, 12, 40, 55, 67, 89, 76, 56];
}

const getGrossProfitMargin = async(year: number): Promise<Array<number>> => {
  return [98, 166, 159, 122, 109, 91, 139, 99, 140, 193, 79, 160];
}

const getNetProfitMargin = async(year: number): Promise<Array<number>> => {
  return [86, 82, 92, 81, 86, 88, 80, 92, 88, 84, 46, 65];
}

const getSalesRegion = async(year: number): Promise<Array<number>> => {
  return [40, 65, 42, 22, 15];
}

const getTopProducts = async (year: number): Promise<Array<TopProduct>> => {
  return [
    {
      id: 0,
      name: "Tesla Model S",
      price: "70.000 $",
      totalSold: "94.000",
      status: "Active",
    },
    {
      id: 1,
      name: "Tesla Model Y",
      price: "45.000 $",
      totalSold: "89.000",
      status: "Inactive",
    },
    {
      id: 2,
      name: "Tesla Model 3",
      price: "35.000 $",
      totalSold: "77.000",
      status: "Active",
    },
    {
      id: 3,
      name: "Tesla Model X",
      price: "120.000 $",
      totalSold: "54.500",
      status: "Banned",
    },
    {
      id: 4,
      name: "Tesla Roadster",
      price: "200.000 $",
      totalSold: "0",
      status: "Pending",
    },
    {
      id: 5,
      name: "Cybertruck",
      price: "39.900 $",
      totalSold: "0",
      status: "Pending",
    },
  ]
}

export default async (year: number): Promise<SalesData> => {
  return {
    cogs: await getCOGS(year),
    aov: await getAOV(year),
    gpm: await getGrossProfitMargin(year),
    npm: await getNetProfitMargin(year),
    salesR: await getSalesRegion(year),
    topProd: await getTopProducts(year),
  };
};
