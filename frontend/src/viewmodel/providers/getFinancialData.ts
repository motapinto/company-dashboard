import FinancialData from "../../model/financialData";
import getProfitMargin from "./shared/getProfitMargin";
import getBalanceSheet from "./shared/getBalanceSheet";
import { getHeader } from "./requests";

const getVatPaid = async (): Promise<Array<number>> => {
  return [78, 81, 80, 45, 34, 12, 40, 55, 67, 89, 76, 56];
};

const getVatDeducted = async (): Promise<Array<number>> => {
  return [78, 81, 80, 45, 34, 12, 40, 55, 67, 89, 76, 56];
};

const getRevenue = async(): Promise<Array<number>> => {
  return [86, 82, 92, 81, 86, 88, 80, 92, 88, 84, 46, 65];
}

const getCost = async(): Promise<Array<number>> => {
  return [86, 82, 92, 81, 86, 88, 80, 92, 88, 84, 46, 65];
}

const getEbidta = async(): Promise<number> => {
  return 12;
}

const getEbidtaMargin = async(): Promise<number> => {
  return 21;
}

export default async (): Promise<FinancialData> => {
  return {
    year: await getHeader(),
    vatPaid: await getVatPaid(),
    vatDeducted: await getVatDeducted(),
    profitMargin: await getProfitMargin(),
    balanceSheet: await getBalanceSheet(),
    revenue: await getRevenue(),
    cost: await getCost(),
    ebitda: await getEbidta(),
    ebitdaMargin: await getEbidtaMargin(),
  };
};