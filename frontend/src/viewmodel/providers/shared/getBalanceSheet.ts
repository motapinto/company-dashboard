import BalanceSheet from '../../../model/balanceSheet'

const getNonCurrentAssets = async(year: number): Promise<Array<number>> => {
  return [8223232];
}

const getCurrentAssets = async(year: number): Promise<Array<number>> => {
  return [4343433];
}

const getCurrentLiabilities = async(year: number): Promise<Array<number>> => {
  return [3123121];
}

const getNonCurrentLiabilities = async(year: number): Promise<Array<number>> => {
  return [2323323];
}

const getEquity = async(year: number): Promise<Array<number>> => {
  return [2323323];
}

const getBalanceSheet = async(year: number): Promise<BalanceSheet> => {
  return {
    nca: await getNonCurrentAssets(year),
    ca: await getCurrentAssets(year),
    cl: await getCurrentLiabilities(year),
    ncl: await getNonCurrentLiabilities(year),
    e: await getEquity(year),
  };
}

export default getBalanceSheet;