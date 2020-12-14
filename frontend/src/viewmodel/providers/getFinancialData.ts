import FinancialData from "../../model/financialData";
import getProfitMargin from "./shared/getProfitMargin";
import getBalanceSheet from "./shared/getBalanceSheet";
import {getHeader, getRevenueAndExpenses, getVat} from "./requests";

export default async (): Promise<FinancialData> => {
  const revenueAndLosses = (await getRevenueAndExpenses()).data;
  const vat = (await getVat())?.data;

  return {
    year: await getHeader(),
    vatPaid: vat.paid,
    vatDeducted: vat.deducted,
    profitMargin: await getProfitMargin(),
    balanceSheet: await getBalanceSheet(),
    revenue: revenueAndLosses.revenue,
    expenses: revenueAndLosses.expenses,
    ebitda: revenueAndLosses.ebitda,
    ebitdaMargin: revenueAndLosses.ebitdaMargin,
  };
};
