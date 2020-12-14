import { getGrossNetSales, getOtherDashboardKPI } from "./shared/utils.js";
import { getEbitdaAndNetIncome } from "./shared/utils.js";

export default (server, db) => {
  server.get("/dashboardKpis", (req, res) => {
    console.log(getGrossNetSales(db));
    let { grossSales, netSales } = getGrossNetSales(db);
    let { ebitda, netIncome } = getEbitdaAndNetIncome(db);
    let otherKPI = getOtherDashboardKPI(db);

    res.json({
      grossTotal: grossSales,
      netTotal: netSales,
      gpm: otherKPI.gpm,
      ebitda,
      netIncome,
      npm: otherKPI.npm,
    });
  });
};
