export const getAccount =  (db, accountID) => {
  return db.GeneralLedgerAccounts.Account.filter(
    account => account.AccountID === accountID )[0];
};

export const getNetSales = (db) => {
  let netSales = 0;
  
  for (const journal of db.GeneralLedgerEntries.Journal) {
    for(const transaction of journal.Transaction) {
      const debitLine =  transaction.Lines.DebitLine;

      if(debitLine && debitLine instanceof Array) {
        for(const debit of debitLine) {
          netSales = updateNetSales(db, netSales, getAccount(db, debit.AccountID), debit.DebitAmount);        
        }
      } else {
        netSales = updateNetSales(db, netSales, getAccount(db, debitLine.AccountID), debitLine.DebitAmount);  
      }
    };
  };

  return netSales;
}   

export const updateNetSales = (db, netSales, account, amount) => {
  const taxonomyCode = account.TaxonomyCode;

  switch(true) {
    /* Vendas e serviços prestados */
    case taxonomyCode >= 506 && taxonomyCode <= 512: return netSales + amount;
    case taxonomyCode == 511 || taxonomyCode == 518: return netSales - amount;
    default: return netSales;
  }
}