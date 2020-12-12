export default (server, db) => {
  server.get("/GeneralAccounts/GroupingCategory/:filter", (req, res) => {
    let accounts = db.GeneralLedgerAccounts.Account.filter(
      (account) => account.GroupingCategory === req.params.filter
    );

    res.json(accounts);
  });

  server.get("/GeneralAccounts/AccountID/:filter", (req, res) => {
    let accounts = db.GeneralLedgerAccounts.Account.filter(
      (account) => account.AccountID === req.params.filter
    );

    res.json(accounts);
  });

  // Sum of credit/debit lines of a single transaction
  function processTransaction(transaction, account_filter, startDate, endDate) {
    function processLine(line, type) {
      if (line.AccountID.indexOf(account_filter) != 0) return 0;
      return type == "credit"
        ? Number.parseInt(line.CreditAmount)
        : Number.parseInt(line.DebitAmount);
    }

    let transactionDate = new Date(transaction.TransactionDate);
    if (
      (startDate != null && transactionDate < startDate) ||
      (endDate != null && transactionDate > endDate)
    ) {
      return {
        totalCredit: 0,
        totalDebit: 0,
      };
    }

    let totalCredit = 0;
    let totalDebit = 0;
    if (
      transaction.Lines.CreditLine &&
      Array.isArray(transaction.Lines.CreditLine)
    ) {
      totalCredit += transaction.Lines.CreditLine.map((line) => {
        return processLine(line, "credit");
      }).reduce((n1, n2) => n1 + n2);
    } else if (transaction.Lines.CreditLine) {
      totalCredit += processLine(transaction.Lines.CreditLine, "credit");
    }

    if (
      transaction.Lines.DebitLine &&
      Array.isArray(transaction.Lines.DebitLine)
    ) {
      totalDebit += transaction.Lines.DebitLine.map((line) => {
        return processLine(line, "debit");
      }).reduce((n1, n2) => n1 + n2);
    } else if (transaction.Lines.DebitLine) {
      totalDebit += processLine(transaction.Lines.DebitLine, "debit");
    }

    return {
      totalCredit: totalCredit,
      totalDebit: totalDebit,
    };
  }

  function accountSumBetweenDates(account_id_filter, startDate, endDate) {
    let totalCredit = 0;
    let totalDebit = 0;
    db.GeneralLedgerEntries.Journal.forEach((journal) => {
      if (Array.isArray(journal.Transaction)) {
        for (let i = 0; i < journal.Transaction.length; i++) {
          let ret = processTransaction(
            journal.Transaction[i],
            account_id_filter,
            startDate,
            endDate
          );
          totalCredit += ret.totalCredit;
          totalDebit += ret.totalDebit;
        }
      } else if (journal.Transaction) {
        let ret = processTransaction(
          journal.Transaction,
          account_id_filter,
          startDate,
          endDate
        );
        totalCredit += ret.totalCredit;
        totalDebit += ret.totalDebit;
      }
    });

    return {
      totalCredit: totalCredit,
      totalDebit: totalDebit,
    };
  }

  server.get("/GeneralAccounts/GrossTotal", (req, res) => {
    let sales = 0;

    db.GeneralLedgerEntries.Journal.forEach((journal) => {
      journal.Transaction.forEach((transaction) => {
        const customer = transaction.CustomerID;
        if (
          customer != null &&
          customer != undefined &&
          transaction.Lines.DebitLine != undefined
        ) {
          if (transaction.Lines.DebitLine.hasOwnProperty("RecordID")) {
            sales += transaction.Lines.DebitLine.DebitAmount;
          } else {
            transaction.Lines.DebitLine.forEach((debitLine) => {
              sales += debitLine.DebitAmount;
            });
          }
        }
      });
    });
    res.json({
      grossTotal: sales,
    });
  });

  server.get("/GeneralAccounts/COGS", (req, res) => {
    let inventory = 0;
    let purchased = 0;

    db.GeneralLedgerAccounts.Account.forEach((account) => {
      const accountId = account.AccountID;

      let accountTaxCode = account.TaxonomyCode;
      const accountGroupingCat = account.GroupingCategory;

      if (accountTaxCode === undefined) return;

      if (accountGroupingCat !== "GM") {
        console.log("> Unexpected Grouping Category:", accountGroupingCat);
        return;
      }

      const accountDebit = parseFloat(
        account.ClosingDebitBalance - account.OpeningDebitBalance
      );
      const accountCredit = parseFloat(
        account.ClosingCreditBalance - account.OpeningCreditBalance
      );
      const accountBal = Math.abs(accountDebit - accountCredit);
      const isSaldoDevedor = accountDebit > accountCredit; // TODO: Rever isto, quando substituo-o, os valores dão muito diferentes

      if (accountBal === 0) return;

      accountTaxCode = parseInt(accountTaxCode);

      switch (accountTaxCode) {
        case 165:
        case 166:
        case 167:
        case 171:
        case 172:
        case 173:
        case 174:
        case 175:
        case 176:
        case 183:
        case 184:
        case 187:
        case 188:
        case 189:
        case 193:
        case 209:
        case 210:
        case 211:
        case 212:
        case 213:
        case 168:
        case 169:
        case 170:
        case 177:
        case 178:
        case 179:
        case 180:
        case 181:
        case 182:
        case 185:
        case 186:
        case 190:
        case 191:
        case 192:
        case 194:
          inventory +=
            account.OpeningDebitBalance -
            account.OpeningCreditBalance -
            (account.ClosingDebitBalance - account.ClosingCreditBalance);
          break;
        case 157:
        case 158:
        case 159:
        case 160:
        case 161:
        case 162:
        case 163:
        case 164:
          purchased +=
            account.ClosingDebitBalance - account.ClosingCreditBalance;
          break;
        default:
          break;
      }
    });

    if (purchased == 0) {
      db.Supplier.forEach((supplier) => {
        db.GeneralLedgerEntries.Journal.forEach((journal) => {
          journal.Transaction.forEach((transaction) => {
            if (transaction.Lines.CreditLine != undefined) {
              if (transaction.Lines.CreditLine.hasOwnProperty("RecordID")) {
                if (
                  supplier.AccountID == transaction.Lines.CreditLine.AccountId
                )
                  purchased += transaction.Lines.CreditLine.CreditAmount;
              } else {
                transaction.Lines.CreditLine.forEach((creditLine) => {
                  if (supplier.AccountID == creditLine.AccountID) {
                    purchased += creditLine.CreditAmount;
                  }
                });
              }
            }
          });
        });
      });
    }

    res.json({
      cogs: inventory + purchased,
    });
  });

  // Sum of all General Entries on the given account, between startDate and endDate
  server.get("/AccountSum/:account_id", (req, res) => {
    let startDate =
      "start-date" in req.query ? new Date(req.query["start-date"]) : null;
    let endDate =
      "end-date" in req.query ? new Date(req.query["end-date"]) : null;
    let account_id_filter = req.params.account_id;

    res.json(accountSumBetweenDates(account_id_filter, startDate, endDate));
  });

  // Sum of all General Entries on the given account by Month
  server.get("/AccountSumByMonth/:account_id", (req, res) => {
    let account_id_filter = req.params.account_id;
    let accountSumByMonth = {};

    for (let i = 1; i <= 12; i++) {
      let date = db.Header.FiscalYear + "-" + i;
      accountSumByMonth[i] = accountSumBetweenDates(
        account_id_filter,
        new Date(date + "-01"),
        new Date(date + "-31")
      );
    }

    res.json(accountSumByMonth);
  });
};
