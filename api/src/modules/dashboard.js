import { getGrossNetSales, getOtherDashboardKPI } from "./shared/utils.js";

export default (server, db) => {
  server.get("/Dashboard/DashboardKPI", (req, res) => {
    let grossNetTotal = getGrossNetSales(db);

    let otherKPI = getOtherDashboardKPI(db);

    res.json({
      grossTotal: grossNetTotal.grossSales,
      netTotal: grossNetTotal.netSales,
      gpm: otherKPI.gpm,
      egr: otherKPI.egr,
      rgr: otherKPI.rgr,
      npm: otherKPI.npm,
    });
  });
};
