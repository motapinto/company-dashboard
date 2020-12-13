import { getGrossSales } from './generalAccounts.js';

export default (server, db) => {
  server.get('/revenueAndExpenses', (_req, res) => {
    let revenue = 0;
    let expenses = 0;
    
    for (const journal of db.GeneralLedgerEntries.Journal) {
      for(const transaction of journal.Transaction) {
        const debitLine =  transaction.Lines.DebitLine;
        const creditLine =  transaction.Lines.CreditLine;

        if(debitLine && debitLine instanceof Array) {
          for(const debit of debitLine) {
            revenue = updateRevenueTaxonomy(revenue, getAccount(debit.AccountID), debit.DebitAmount);        
          }
        } else {
          revenue = updateRevenueTaxonomy(revenue, getAccount(debitLine.AccountID), debitLine.DebitAmount);  
        }

        if(creditLine && creditLine instanceof Array) {
          for(const credit of creditLine) {
            expenses = updateExpensesTaxonomy(expenses, getAccount(credit.AccountID), credit.CreditAmount)  
          }
        } else {
          expenses = updateExpensesTaxonomy(expenses, getAccount(creditLine.AccountID), creditLine.CreditAmount)   
        }
      };
    };

    const ebitda = revenue - expenses;
    const ebitdaMargin = ebitda / getGrossSales(db.GeneralLedgerEntries.Journal);
    res.json({ revenue, expenses, ebitda, ebitdaMargin });
  });

  const getAccount =  (accountID) => {
    return db.GeneralLedgerAccounts.Account.filter(
      account => account.AccountID === accountID )[0];
  };

  const updateRevenueTaxonomy = (revenue, account, amount) => {
    const taxonomyCode = account.TaxonomyCode;

    switch(true) {
      /* Vendas e serviços prestados */
      case taxonomyCode >= 506 && taxonomyCode <= 518: return revenue + amount;
      case taxonomyCode == 511 || taxonomyCode == 518: return revenue - amount;

      /* Subsídios à exploração */
      case taxonomyCode >= 527 && taxonomyCode <= 528: return revenue + amount;
      
      /* Ganhos / perdas imputados de subsidiárias, associadas e empreendimentos conjuntos */
      case taxonomyCode >= 614 && taxonomyCode <= 616: return revenue + amount;
      case taxonomyCode >= 638 && taxonomyCode <= 639: return revenue + amount;
      case taxonomyCode >= 479 && taxonomyCode <= 482: return revenue - amount;

      /* Variação nos inventários da produção */
      case taxonomyCode >= 519 && taxonomyCode <= 522: return revenue + amount;

      /* Trabalhos para a própria entidade */
      case taxonomyCode >= 523 && taxonomyCode <= 526: return revenue + amount;

      /* Aumentos / reduções de justo valor */
      case taxonomyCode >= 594 && taxonomyCode <= 602: return revenue + amount;
      case taxonomyCode >= 454 && taxonomyCode <= 462: return revenue - amount;

      /* Outros rendimentos  */
      case taxonomyCode >= 603 && taxonomyCode <= 613: return revenue + amount;
      case taxonomyCode >= 617 && taxonomyCode <= 634: return revenue + amount;
      case taxonomyCode >= 636 && taxonomyCode <= 637: return revenue + amount;
      case taxonomyCode == 640: return revenue + amount;
      case taxonomyCode == 642: return revenue + amount;
  
      default: return revenue;
    }
  }

  const updateExpensesTaxonomy = (expenses, account, amount) => {
    const taxonomyCode = account.TaxonomyCode;

    switch(true) {
      /* Custo das mercadorias vendidas e das matérias consumidas */
      case taxonomyCode >= 353 && taxonomyCode <= 355: return expenses + amount;

      /* Fornecimentos e serviços externos */
      case taxonomyCode >= 356 && taxonomyCode <= 384: return expenses + amount;
      
      /* Gastos com o pessoal */
      case taxonomyCode >= 385 && taxonomyCode <= 393: return expenses + amount;

      /* Imparidade / ajustamentos de inventários (perdas / reversões)  */
      case taxonomyCode >= 415 && taxonomyCode <= 421: return expenses + amount;
      case taxonomyCode >= 549 && taxonomyCode <= 555: return expenses - amount;

      /* Imparidade de dívidas a receber (perdas / reversões) */
      case taxonomyCode >= 413 && taxonomyCode <= 414: return expenses + amount;
      case taxonomyCode >= 547 && taxonomyCode <= 548: return expenses - amount;

      /* Provisões (aumentos / reduções)  */
      case taxonomyCode >= 463 && taxonomyCode <= 470: return expenses + amount;
      case taxonomyCode >= 586 && taxonomyCode <= 593: return expenses - amount;

      /* Imparidade de investimentos não depreciáveis / amortizáveis (perdas / reversões) */
      case taxonomyCode == 412: return expenses + amount;
      case taxonomyCode >= 422 && taxonomyCode <= 425: return expenses + amount;
      case taxonomyCode >= 441 && taxonomyCode <= 453: return expenses + amount;
      case taxonomyCode >= 556 && taxonomyCode <= 558: return expenses - amount;
      case taxonomyCode >= 573 && taxonomyCode <= 585: return expenses + amount;

      /* Outros gastos */
      case taxonomyCode >= 471 && taxonomyCode <= 478: return expenses + amount;
      case taxonomyCode >= 483 && taxonomyCode <= 499: return expenses + amount;

      default: return expenses;
    }
  }
}     
