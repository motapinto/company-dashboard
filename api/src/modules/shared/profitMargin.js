export default (server, db) => {
    server.get('/profitMargin', (_req, res) => {
        for (const journal of db.GeneralLedgerEntries.Journal) {
            for(const transaction of journal.Transaction) {
              const debitLine =  transaction.Lines.DebitLine;
              const creditLine =  transaction.Lines.CreditLine;
      
              if(debitLine && debitLine instanceof Array) {
                for(const debit of debitLine) {
                  sum = updateSumEbitda(sum, revenue, getAccount(db, debit.AccountID), debit.DebitAmount);        
                }
              } else {
                sum = updateSumEbitda(sum, revenue, getAccount(db, debitLine.AccountID), debitLine.DebitAmount);  
              }
      
              if(creditLine && creditLine instanceof Array) {
                for(const credit of creditLine) {
                  subtraction = updateSubtractionEbitda(subtraction, expenses, getAccount(db, credit.AccountID), credit.CreditAmount)  
                }
              } else {
                subtraction = updateSubtractionEbitda(subtraction, expenses, getAccount(db, creditLine.AccountID), creditLine.CreditAmount)   
              }
            };
          }

        res.json(db.Header.FiscalYear);
    });
}