import FinancialData from "../../model/financialData";
import getProfitMargin from "./shared/getProfitMargin";
import getBalanceSheet from "./shared/getBalanceSheet";
import { getHeader, getRevenueAndExpenses } from "./requests";

const getVatPaid = async (): Promise<Array<number>> => {
  return [78, 81, 80, 45, 34, 12, 40, 55, 67, 89, 76, 56];
};

const getVatDeducted = async (): Promise<Array<number>> => {
  return [78, 81, 80, 45, 34, 12, 40, 55, 67, 89, 76, 56];
};

export default async (): Promise<FinancialData> => {
  const revenueAndLosses = (await getRevenueAndExpenses()).data;
  
  return {
    year: await getHeader(),
    vatPaid: await getVatPaid(),
    vatDeducted: await getVatDeducted(),
    profitMargin: await getProfitMargin(),
    balanceSheet: await getBalanceSheet(),
    revenue: revenueAndLosses.revenue,
    expenses: revenueAndLosses.expenses,
    ebitda: revenueAndLosses.ebitda,
    ebitdaMargin: revenueAndLosses.ebitdaMargin,
  };
};