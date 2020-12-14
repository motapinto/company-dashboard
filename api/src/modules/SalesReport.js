import { getCOGS } from "./shared/utils.js";

export default (server, db) => {
  server.get("/SalesReport/COGS", (req, res) => {
    res.json({
      cogs: getCOGS(db).cogs,
      cogsMonthly: getCOGS(db).cogsMonthly,
    });
  });
};
