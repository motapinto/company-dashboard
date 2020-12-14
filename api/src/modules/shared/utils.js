export const getAccount = (db, accountID) => {
  return db.GeneralLedgerAccounts.Account.filter(
    (account) => account.AccountID === accountID
  )[0];
};

export const getGrossNetSales = (db) => {
  let netSalesMonthly = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let grossSalesMonthly = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (const journal of db.GeneralLedgerEntries.Journal) {
    for (const transaction of journal.Transaction) {
      const debitLine = transaction.Lines.DebitLine;
      let transactionDate = new Date(transaction.TransactionDate);

      if (debitLine && debitLine instanceof Array) {
        for (const debit of debitLine) {
          netSalesMonthly[transactionDate.getMonth()] = updateNetSales(
            netSalesMonthly[transactionDate.getMonth()],
            getAccount(db, debit.AccountID),
            debit.DebitAmount
          );
          grossSalesMonthly[transactionDate.getMonth()] = updateGrossSales(
            grossSalesMonthly[transactionDate.getMonth()],
            getAccount(db, debit.AccountID),
            debit.DebitAmount
          );
        }
      } else {
        netSalesMonthly[transactionDate.getMonth()] = updateNetSales(
          netSalesMonthly[transactionDate.getMonth()],
          getAccount(db, debitLine.AccountID),
          debitLine.DebitAmount
        );
        grossSalesMonthly[transactionDate.getMonth()] = updateGrossSales(
          grossSalesMonthly[transactionDate.getMonth()],
          getAccount(db, debitLine.AccountID),
          debitLine.DebitAmount
        );
      }
    }
  }

  return {
    grossSales: grossSalesMonthly.reduce(
      (previousValue, current) => previousValue + current,
      0
    ),
    netSales: netSalesMonthly.reduce(
      (previousValue, current) => previousValue + current,
      0
    ),
    grossSalesMonthly,
    netSalesMonthly,
  };
};

export const updateNetSales = (netSales, account, amount) => {
  const taxonomyCode = account.TaxonomyCode;

  switch (true) {
    /* Vendas e serviços prestados */
    case taxonomyCode >= 506 && taxonomyCode <= 510:
      return netSales + amount;
    case taxonomyCode == 511 || taxonomyCode == 512 || taxonomyCode == 518:
      return netSales - amount;
    default:
      return netSales;
  }
};

export const updateGrossSales = (grossSales, account, amount) => {
  const taxonomyCode = account.TaxonomyCode;
  switch (true) {
    /* Vendas e serviços prestados */
    case taxonomyCode >= 506 && taxonomyCode <= 512:
      return grossSales + amount;
    default:
      return grossSales;
  }
};

export const getEbitdaAndNetIncome = (db) => {
  let ebitdaSum = 0;
  let ebitdaSubtraction = 0;
  let netIncome = 0;
  let revenue = { number: 0 };
  let expenses = { number: 0 };

  for (const journal of db.GeneralLedgerEntries.Journal) {
    for (const transaction of journal.Transaction) {
      const debitLine = transaction.Lines.DebitLine;
      const creditLine = transaction.Lines.CreditLine;

      if (debitLine && debitLine instanceof Array) {
        for (const debit of debitLine) {
          const account = getAccount(db, debit.AccountID);
          const amount = debit.DebitAmount;
          ebitdaSum = updateSumEbitda(ebitdaSum, revenue, account, amount);
          netIncome = updateNetIncome(netIncome, account, amount);
        }
      } else {
        const account = getAccount(db, debitLine.AccountID);
        const amount = debitLine.DebitAmount;
        ebitdaSum = updateSumEbitda(ebitdaSum, revenue, account, amount);
        netIncome = updateNetIncome(netIncome, account, amount);
      }

      if (creditLine && creditLine instanceof Array) {
        for (const credit of creditLine) {
          const account = getAccount(db, credit.AccountID);
          const amount = credit.CreditAmount;
          ebitdaSubtraction = updateSubtractionEbitda(
            ebitdaSubtraction,
            expenses,
            account,
            amount
          );
          netIncome = updateNetIncome(netIncome, account, amount);
        }
      } else {
        const account = getAccount(db, creditLine.AccountID);
        const amount = creditLine.CreditAmount;
        ebitdaSubtraction = updateSubtractionEbitda(
          ebitdaSubtraction,
          expenses,
          account,
          amount
        );
        netIncome = updateNetIncome(netIncome, account, amount);
      }
    }
  }

  const ebitda = ebitdaSum - ebitdaSubtraction;
  const { netSales } = getGrossNetSales(db);
  const ebitdaMargin = (ebitda / netSales) * 100;
  netIncome += ebitda;
  return { ebitda, ebitdaMargin, revenue, expenses, netIncome };
};

const updateSumEbitda = (sum, revenue, account, amount) => {
  const taxonomyCode = account.TaxonomyCode;

  switch (true) {
    /* Vendas e serviços prestados */
    case taxonomyCode >= 506 && taxonomyCode <= 518:
      revenue.number += amount;
      return sum + amount;

    case taxonomyCode == 511 || taxonomyCode == 518:
      revenue.number += amount;
      return sum - amount;

    /* Subsídios à exploração */
    case taxonomyCode >= 527 && taxonomyCode <= 528:
      return sum + amount;

    /* Ganhos / perdas imputados de subsidiárias, associadas e empreendimentos conjuntos */
    case taxonomyCode >= 614 && taxonomyCode <= 616:
      return sum + amount;
    case taxonomyCode >= 638 && taxonomyCode <= 639:
      return sum + amount;
    case taxonomyCode >= 479 && taxonomyCode <= 482:
      return sum - amount;

    /* Variação nos inventários da produção */
    case taxonomyCode >= 519 && taxonomyCode <= 522:
      return sum + amount;

    /* Trabalhos para a própria entidade */
    case taxonomyCode >= 523 && taxonomyCode <= 526:
      return sum + amount;

    /* Aumentos / reduções de justo valor */
    case taxonomyCode >= 594 && taxonomyCode <= 602:
      return sum + amount;
    case taxonomyCode >= 454 && taxonomyCode <= 462:
      return sum - amount;

    /* Outros rendimentos  */
    case taxonomyCode >= 603 && taxonomyCode <= 613:
      return sum + amount;
    case taxonomyCode >= 617 && taxonomyCode <= 634:
      return sum + amount;
    case taxonomyCode >= 636 && taxonomyCode <= 637:
      return sum + amount;
    case taxonomyCode == 640:
      return sum + amount;
    case taxonomyCode == 642:
      return sum + amount;

    default:
      return sum;
  }
};

const updateSubtractionEbitda = (subtraction, expenses, account, amount) => {
  const taxonomyCode = account.TaxonomyCode;

  switch (true) {
    /* Custo das mercadorias vendidas e das matérias consumidas */
    case taxonomyCode >= 353 && taxonomyCode <= 355:
      expenses.number += amount;
      return subtraction + amount;

    /* Fornecimentos e serviços externos */
    case taxonomyCode >= 356 && taxonomyCode <= 384:
      expenses.number += amount;
      return subtraction + amount;

    /* Gastos com o pessoal */
    case taxonomyCode >= 385 && taxonomyCode <= 393:
      expenses.number += amount;
      return subtraction + amount;

    /* Imparidade / ajustamentos de inventários (perdas / reversões)  */
    case taxonomyCode >= 415 && taxonomyCode <= 421:
      expenses.number += amount;
      return subtraction + amount;
    case taxonomyCode >= 549 && taxonomyCode <= 555:
      expenses.number += amount;
      return subtraction - amount;

    /* Imparidade de dívidas a receber (perdas / reversões) */
    case taxonomyCode >= 413 && taxonomyCode <= 414:
      expenses.number += amount;
      return subtraction + amount;
    case taxonomyCode >= 547 && taxonomyCode <= 548:
      expenses.number += amount;
      return subtraction - amount;

    /* Provisões (aumentos / reduções)  */
    case taxonomyCode >= 463 && taxonomyCode <= 470:
      expenses.number += amount;
      return subtraction + amount;
    case taxonomyCode >= 586 && taxonomyCode <= 593:
      expenses.number += amount;
      return subtraction - amount;

    /* Imparidade de investimentos não depreciáveis / amortizáveis (perdas / reversões) */
    case taxonomyCode == 412:
      return subtraction + amount;
    case taxonomyCode >= 422 && taxonomyCode <= 425:
      expenses.number += amount;
      return subtraction + amount;
    case taxonomyCode >= 441 && taxonomyCode <= 453:
      expenses.number += amount;
      return subtraction + amount;
    case taxonomyCode >= 556 && taxonomyCode <= 558:
      expenses.number += amount;
      return subtraction - amount;
    case taxonomyCode >= 573 && taxonomyCode <= 585:
      expenses.number += amount;
      return subtraction + amount;

    /* Outros gastos */
    case taxonomyCode >= 471 && taxonomyCode <= 478:
      expenses.number += amount;
      return subtraction + amount;
    case taxonomyCode >= 483 && taxonomyCode <= 499:
      expenses.number += amount;
      return subtraction + amount;

    default:
      return subtraction;
  }
};

const updateNetIncome = (netIncome, account, amount) => {
  const taxonomyCode = account.TaxonomyCode;

  switch (true) {
    /* Gastos / reversões de depreciação e de amortização */
    case taxonomyCode >= 394 && taxonomyCode <= 411:
      return netIncome - amount;
    case taxonomyCode >= 529 && taxonomyCode <= 546:
      return netIncome + amount;

    /* Imparidade de investimentos depreciáveis / amortizáveis (perdas / reversões) */
    case taxonomyCode >= 426 && taxonomyCode <= 440:
      return netIncome - amount;
    case taxonomyCode >= 559 && taxonomyCode <= 572:
      return netIncome + amount;

    /* Juros e rendimentos similares obtidos */
    case taxonomyCode == 635 || taxonomyCode == 641:
      return netIncome + amount;

    /* Juros e gastos similares suportados */
    case taxonomyCode >= 500 && taxonomyCode <= 505:
      return netIncome + amount;

    /* Imposto sobre o rendimento do período */
    case taxonomyCode == 644 || taxonomyCode == 645:
      return netIncome - amount;

    default:
      return netIncome;
  }
};

export const getCOGS = (db) => {
  let cogsMonthly = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (const journal of db.GeneralLedgerEntries.Journal) {
    for (const transaction of journal.Transaction) {
      const debitLine = transaction.Lines.DebitLine;
      let transactionDate = new Date(transaction.TransactionDate);

      if (debitLine && debitLine instanceof Array) {
        for (const debit of debitLine) {
          cogsMonthly[transactionDate.getMonth()] = updateCOGS(
            cogsMonthly[transactionDate.getMonth()],
            getAccount(db, debit.AccountID),
            debit.DebitAmount
          );
        }
      } else {
        cogsMonthly[transactionDate.getMonth()] = updateCOGS(
          cogsMonthly[transactionDate.getMonth()],
          getAccount(db, debitLine.AccountID),
          debitLine.DebitAmount
        );
      }
    }
  }

  let cogsOtherWay = 0;
  db.Supplier.forEach((supplier) => {
    db.GeneralLedgerEntries.Journal.forEach((journal) => {
      journal.Transaction.forEach((transaction) => {
        if (transaction.Lines.CreditLine != undefined) {
          if (transaction.Lines.CreditLine.hasOwnProperty("RecordID")) {
            if (supplier.AccountID == transaction.Lines.CreditLine.AccountId)
              cogsOtherWay += transaction.Lines.CreditLine.CreditAmount;
          } else {
            transaction.Lines.CreditLine.forEach((creditLine) => {
              if (supplier.AccountID == creditLine.AccountID) {
                cogsOtherWay += creditLine.CreditAmount;
              }
            });
          }
        }
      });
    });
  });

  return {
    cogs: cogsMonthly.reduce(
      (previousValue, current) => previousValue + current,
      0
    ),
    cogsMonthly,
  };
};

//TAX SNC 353+354+355
export const updateCOGS = (cogs, account, amount) => {
  const taxonomyCode = account.TaxonomyCode;
  switch (true) {
    /* Vendas e serviços prestados */
    case taxonomyCode == 353 || taxonomyCode == 354 || taxonomyCode == 355:
      return cogs + amount;
    default:
      return cogs;
  }
};
