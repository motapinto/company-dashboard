import FinancialData from "../../model/financialData";
const axios = require("axios").default;

const url = `${process.env.REACT_APP_URL}/api/${process.env.REACT_APP_TENANT}/${process.env.REACT_APP_ORGANIZATION}`;
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.REACT_APP_TOKEN}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

const getVatPaid = async (year: number): Promise<Array<number>> => {
  return [78, 81, 80, 45, 34, 12, 40, 55, 67, 89, 76, 56];
};

const getVatDeducted = async (year: number): Promise<Array<number>> => {
  return [78, 81, 80, 45, 34, 12, 40, 55, 67, 89, 76, 56];
};

const getGrossProfitMargin = async(year: number): Promise<Array<number>> => {
  return [98, 166, 159, 122, 109, 91, 139, 99, 140, 193, 79, 160];
}

const getNetProfitMargin = async(year: number): Promise<Array<number>> => {
  return [86, 82, 92, 81, 86, 88, 80, 92, 88, 84, 46, 65];
}

const getNonCurrentAssets = async(year: number): Promise<Array<number>> => {
  return [86, 82, 92, 81, 86, 88, 80, 92, 88, 84, 46, 65];
}

const getCurrentAssets = async(year: number): Promise<Array<number>> => {
  return [86, 82, 92, 81, 86, 88, 80, 92, 88, 84, 46, 65];
}

const getCurrentLiabilities = async(year: number): Promise<Array<number>> => {
  return [86, 82, 92, 81, 86, 88, 80, 92, 88, 84, 46, 65];
}

const getNonCurrentLiabilities = async(year: number): Promise<Array<number>> => {
  return [86, 82, 92, 81, 86, 88, 80, 92, 88, 84, 46, 65];
}

const getEquity = async(year: number): Promise<Array<number>> => {
  return [86, 82, 92, 81, 86, 88, 80, 92, 88, 84, 46, 65];
}

const getRevenue = async(year: number): Promise<Array<number>> => {
  return [86, 82, 92, 81, 86, 88, 80, 92, 88, 84, 46, 65];
}

const getCost = async(year: number): Promise<Array<number>> => {
  return [86, 82, 92, 81, 86, 88, 80, 92, 88, 84, 46, 65];
}

const getEbidta = async(year: number): Promise<number> => {
  return 12;
}

const getEbidtaMargin = async(year: number): Promise<number> => {
  return 21;
}

export default async (year: number): Promise<FinancialData> => {
  return {
    vatPaid: await getVatPaid(year),
    vatDeducted: await getVatDeducted(year),
    gpm: await getGrossProfitMargin(year),
    npm: await getNetProfitMargin(year),
    nca: await getNonCurrentAssets(year),
    ca: await getCurrentAssets(year),
    cl: await getCurrentLiabilities(year),
    ncl: await getNonCurrentLiabilities(year),
    e: await getEquity(year),
    revenue: await getRevenue(year),
    cost: await getCost(year),
    ebitda: await getEbidta(year),
    ebitdaMargin: await getEbidtaMargin(year),
  };
};