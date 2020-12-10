import BalanceSheet from '../../../model/balanceSheet'
import { getBalanceSheet } from '../requests';

export default async(year: number): Promise<BalanceSheet> => {
  const balanceSheet = (await getBalanceSheet()).data;

  return {
    nca: balanceSheet['Ativo']['Total do Ativo corrente'],
    ca: balanceSheet['Ativo']['Total do Ativo não corrente'],
    cl: balanceSheet['Capital Próprio e Passivo']['Passivo']['Total do Passivo corrente'],
    ncl: balanceSheet['Capital Próprio e Passivo']['Passivo']['Total do Passivo não corrente'],
    e: balanceSheet['Capital Próprio e Passivo']['Capital Próprio']['Total do Capital Próprio'],
  };
}