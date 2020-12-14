import { getAccount, getGrossNetSales } from "./shared/utils.js";

export default (server, db) => {
  server.get("/revenueAndExpenses", (_req, res) => {
    let sum = 0;
    let subtraction = 0;
    let revenue = { number: 0 };
    let expenses = { number: 0 };

    for (const journal of db.GeneralLedgerEntries.Journal) {
      for (const transaction of journal.Transaction) {
        const debitLine = transaction.Lines.DebitLine;
        const creditLine = transaction.Lines.CreditLine;

        if (debitLine && debitLine instanceof Array) {
          for (const debit of debitLine) {
            sum = updateSumEbitda(
              sum,
              revenue,
              getAccount(db, debit.AccountID),
              debit.DebitAmount
            );
          }
        } else {
          sum = updateSumEbitda(
            sum,
            revenue,
            getAccount(db, debitLine.AccountID),
            debitLine.DebitAmount
          );
        }

        if (creditLine && creditLine instanceof Array) {
          for (const credit of creditLine) {
            subtraction = updateSubtractionEbitda(
              subtraction,
              expenses,
              getAccount(db, credit.AccountID),
              credit.CreditAmount
            );
          }
        } else {
          subtraction = updateSubtractionEbitda(
            subtraction,
            expenses,
            getAccount(db, creditLine.AccountID),
            creditLine.CreditAmount
          );
        }
      }
    }

    const ebitda = sum - subtraction;
    const ebitdaMargin = (ebitda / getGrossNetSales(db).netSales) * 100;
    res.json({
      revenue: revenue.number,
      expenses: expenses.number,
      ebitda,
      ebitdaMargin,
    });
  });

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
};
