import FinancialData from "../../model/financialData";
import getProfitMargin from "./shared/getProfitMargin";
import getBalanceSheet from "./shared/getBalanceSheet";
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
    profitMargin: await getProfitMargin(year),
    balanceSheet: await getBalanceSheet(year),
    revenue: await getRevenue(year),
    cost: await getCost(year),
    ebitda: await getEbidta(year),
    ebitdaMargin: await getEbidtaMargin(year),
  };
};