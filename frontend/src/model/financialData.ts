import ProfitMargin from "./profitMargin";
import BalanceSheet from "./balanceSheet";

export default interface FinancialData {
  year: number
  vatPaid: Array<number>,
  vatDeducted: Array<number>,
  profitMargin: ProfitMargin,
  balanceSheet: BalanceSheet
  revenue: Array<number>,
  cost: Array<number>,
  ebitda: number,
  ebitdaMargin: number,
}