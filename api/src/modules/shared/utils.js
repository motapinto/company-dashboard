export const getAccount = (db, accountID) => {
  return db.GeneralLedgerAccounts.Account.filter(
    (account) => account.AccountID === accountID
  )[0];
};

export const getOtherDashboardKPI = (db) => {
  return {
    gpm: 12011,
    egr: 221212,
    rgr: 21212,
    npm: 121221,
  };
};

export const getGrossNetSales = (db) => {
  let netSales = 0;
  let grossSales = 0;

  for (const journal of db.GeneralLedgerEntries.Journal) {
    for (const transaction of journal.Transaction) {
      const debitLine = transaction.Lines.DebitLine;

      if (debitLine && debitLine instanceof Array) {
        for (const debit of debitLine) {
          netSales = updateNetSales(
            db,
            netSales,
            getAccount(db, debit.AccountID),
            debit.DebitAmount
          );
          grossSales = updateGrossSales(
            db,
            grossSales,
            getAccount(db, debit.AccountID),
            debit.DebitAmount
          );
        }
      } else {
        netSales = updateNetSales(
          db,
          netSales,
          getAccount(db, debitLine.AccountID),
          debitLine.DebitAmount
        );
        grossSales = updateGrossSales(
          db,
          grossSales,
          getAccount(db, debitLine.AccountID),
          debitLine.DebitAmount
        );
      }
    }
  }

  return {
    netSales: netSales,
    grossSales: grossSales,
  };
};

export const updateNetSales = (db, netSales, account, amount) => {
  const taxonomyCode = account.TaxonomyCode;

  switch (true) {
    /* Vendas e serviços prestados */
    case taxonomyCode >= 506 && taxonomyCode <= 510:
      return netSales + amount;
    case taxonomyCode == 511 || taxonomyCode == 511 || taxonomyCode == 518:
      return netSales - amount;
    default:
      return netSales;
  }
};

//TAX SNC 506+507+508+509+/-510
export const updateGrossSales = (db, grossSales, account, amount) => {
  const taxonomyCode = account.TaxonomyCode;
  switch (true) {
    /* Vendas e serviços prestados */
    case (taxonomyCode >= 506 && taxonomyCode <= 509) ||
      taxonomyCode == 511 ||
      taxonomyCode == 512:
      return grossSales + amount;
    //TODO 510 has +/- that we don't understand
    case taxonomyCode == 510:
      if (amount > 0) return grossSales + amount;
      break;
    default:
      return grossSales;
  }
};
