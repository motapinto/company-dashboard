import { getGrossNetSales, getEbitdaAndNetIncome, getCOGS } from "./shared/utils.js";

export default (server, db) => {
  server.get("/dashboardKpis", (req, res) => {
    let { grossSales, netSales } = getGrossNetSales(db);
    let { ebitda, netIncome, expenses } = getEbitdaAndNetIncome(db);
    let { cogs } = getCOGS(db);

    res.json({
      grossTotal: grossSales,
      netTotal: netSales,
      ebitda,
      netIncome,
      gpm: (grossSales - cogs) * 100 / grossSales, // <==> (revenue - cogs) / revenue
      npm: (grossSales - expenses.number) * 100 / grossSales, // <==> netIncome / revenue
    });
  });
};
