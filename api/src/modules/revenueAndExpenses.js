import { getEbitdaAndNetIncome } from './shared/utils.js';

export default (server, db) => {
  server.get('/revenueAndExpenses', (_req, res) => {
    const {ebitda, ebitdaMargin, revenue, expenses} = getEbitdaAndNetIncome(db);
    res.json({ revenue: revenue.number, expenses: expenses.number, ebitda, ebitdaMargin });
  });
}
