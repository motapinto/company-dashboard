import { getGrossSales } from './generalAccounts.js';

export default (server, db) => {
  server.get('/revenueAndExpenses', (_req, res) => {
    let revenue = 0;
    let expenses = 0;
    let ebitda = 0;
    
    for (const journal of db.GeneralLedgerEntries.Journal) {
      for(const transaction of journal.Transaction) {
        const debitLine =  transaction.Lines.DebitLine;
        const creditLine =  transaction.Lines.CreditLine;

        if(debitLine && debitLine instanceof Array) {
          for(const debit of debitLine) {
            if(isRevenueTaxonomy(getAccount(debit.AccountID))) {
              revenue += debit.DebitAmount;
              ebitda += debit.DebitAmount;
            }        
          }
        } else {
          if(isRevenueTaxonomy(getAccount(debitLine.AccountID))) {
            revenue += debitLine.DebitAmount;
            ebitda += debitLine.DebitAmount;
          }  
        }

        if(creditLine && creditLine instanceof Array) {
          for(const credit of creditLine) {
            if(isExpenseTaxonomy(getAccount(credit.AccountID))) {
              expenses += credit.CreditAmount;
              ebitda += credit.CreditAmount;
            }        
          }
        } else {
          if(isExpenseTaxonomy(getAccount(creditLine.AccountID))) {
            expenses += creditLine.CreditAmount;
            ebitda +=creditLine.CreditAmount;
          }  
        }
      };
    };

    const ebitdaMargin = ebitda / getGrossSales(db.GeneralLedgerEntries.Journal);
    res.json({ revenue, expenses, ebitda, ebitdaMargin });
  });

  const getAccount = async (account) => {
    return db.GeneralLedgerAccounts.Account.filter(
      account => account.AccountID ===account );
  };

  const isRevenueTaxonomy = async (account) => {
    const taxonomyCode = account.TaxonomyCode;

    switch(true) {
      /* Vendas e serviços prestados */
      case taxonomyCode >= 506 && taxonomyCode <= 518: return true;

      /* Subsídios à exploração */
      case taxonomyCode >= 527 && taxonomyCode <= 528: return true;
      
      /* Ganhos / perdas imputados de subsidiárias, associadas e empreendimentos conjuntos */
      case taxonomyCode >= 614 && taxonomyCode <= 616: return true;
      case taxonomyCode >= 638 && taxonomyCode <= 639: return true;
      case taxonomyCode >= 479 && taxonomyCode <= 482: return true;

      /* Variação nos inventários da produção */
      case taxonomyCode >= 519 && taxonomyCode <= 522: return true;

      /* Trabalhos para a própria entidade */
      case taxonomyCode >= 523 && taxonomyCode <= 526: return true;

      /* Aumentos / reduções de justo valor */
      case taxonomyCode >= 594 && taxonomyCode <= 602: return true;
      case taxonomyCode >= 454 && taxonomyCode <= 462: return true;

      /* Outros rendimentos  */
      case taxonomyCode >= 603 && taxonomyCode <= 613: return true;
      case taxonomyCode >= 617 && taxonomyCode <= 634: return true;
      case taxonomyCode >= 636 && taxonomyCode <= 637: return true;
      case taxonomyCode == 640: return true;
      case taxonomyCode == 642: return true;
  
      default: false;
    }
  }

  const isExpenseTaxonomy = async (account) => {
    const taxonomyCode = account.TaxonomyCode;

    switch(true) {
      /* Custo das mercadorias vendidas e das matérias consumidas */
      case taxonomyCode >= 353 && taxonomyCode <= 355: return true;

      /* Fornecimentos e serviços externos */
      case taxonomyCode >= 356 && taxonomyCode <= 384: return true;
      
      /* Gastos com o pessoal */
      case taxonomyCode >= 385 && taxonomyCode <= 393: return true;

      /* Imparidade / ajustamentos de inventários (perdas / reversões)  */
      case taxonomyCode >= 415 && taxonomyCode <= 421: return true;
      case taxonomyCode >= 549 && taxonomyCode <= 555: return true;

      /* Imparidade de dívidas a receber (perdas / reversões) */
      case taxonomyCode >= 413 && taxonomyCode <= 414: return true;
      case taxonomyCode >= 547 && taxonomyCode <= 548: return true;

      /* Provisões (aumentos / reduções)  */
      case taxonomyCode >= 463 && taxonomyCode <= 470: return true;
      case taxonomyCode >= 586 && taxonomyCode <= 593: return true;

      /* Imparidade de investimentos não depreciáveis / amortizáveis (perdas / reversões) */
      case taxonomyCode == 412: return true;
      case taxonomyCode >= 422 && taxonomyCode <= 425: return true;
      case taxonomyCode >= 441 && taxonomyCode <= 453: return true;
      case taxonomyCode >= 556 && taxonomyCode <= 558: return true;
      case taxonomyCode >= 573 && taxonomyCode <= 585: return true;

      /* Outros gastos */
      case taxonomyCode >= 471 && taxonomyCode <= 478: return true;
      case taxonomyCode >= 483 && taxonomyCode <= 499: return true;
  
      default: false;
    }
  }
}     
