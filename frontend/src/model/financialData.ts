import ProfitMargin from "./profitMargin";

export default interface FinancialData {
  vatPaid: Array<number>,
  vatDeducted: Array<number>,
  profitMargin: ProfitMargin,
  nca: Array<number>,
  ca: Array<number>,
  cl: Array<number>,
  ncl: Array<number>,
  e: Array<number>,
  revenue: Array<number>,
  cost: Array<number>,
  ebitda: number,
  ebitdaMargin: number,
}