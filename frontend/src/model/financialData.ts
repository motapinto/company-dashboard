export default interface FinancialData {
  vatPaid: Array<number>,
  vatDeducted: Array<number>,
  gpm: Array<number>,
  npm: Array<number>,
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