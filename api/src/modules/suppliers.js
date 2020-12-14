export default (server, db) => {
    server.get('/Supplier/spending', (req, res) => {
        const suppliers = [];

        for (const supplierElement of db.Supplier) {
            if(supplierElement.AccountID === "Desconhecido") {
                continue;
            }

            const account = db.GeneralLedgerAccounts.Account.find((account) => account.AccountID === supplierElement.AccountID)
            if(!account || account.TaxonomyCode < 37 || account.TaxonomyCode > 42) continue;

            const supplier = {
                companyName: supplierElement.CompanyName,
                accountID: supplierElement.AccountID,
                spending: 0
            }

            for (const journal of db.GeneralLedgerEntries.Journal) {
                for (const transaction of journal.Transaction) {
                    // single debit line
                    if(transaction.Lines.CreditLine.AccountID) {
                        if(transaction.Lines.CreditLine.AccountID === supplier.accountID) {
                            supplier.spending += transaction.Lines.CreditLine.CreditAmount;
                        }
                        continue;
                    }

                    for (const creditLine of transaction.Lines.CreditLine) {
                        if(creditLine.AccountID === supplier.accountID) {
                            supplier.spending += creditLine.CreditAmount;
                        }
                    }
                }
            }

            supplier.spending = parseFloat(supplier.spending.toFixed(2));
            suppliers.push(supplier);
        }

        res.json(suppliers);
    });

    server.get('/Supplier/quality', (req, res) => {
        const suppliers = [];

        for (const supplierElement of db.Supplier) {
            if (supplierElement.AccountID === "Desconhecido") {
                continue;
            }

            const account = db.GeneralLedgerAccounts.Account.find((account) => account.AccountID === supplierElement.AccountID)
            if(!account || account.TaxonomyCode < 37 || account.TaxonomyCode > 42) continue;

            suppliers.push({
                companyName: supplierElement.CompanyName,
                accountID: supplierElement.AccountID,
                openingDebitBalance: account.OpeningDebitBalance,
                openingCreditBalance: account.OpeningCreditBalance,
                creditLines: [],
                debitLines: []
            });
        }

        db.GeneralLedgerEntries.Journal.forEach((journal) => {
            journal.Transaction.forEach((transaction) => {

                // Debit lines
                if (transaction.Lines.DebitLine.hasOwnProperty("RecordID")) {
                    // single DebitLine
                    const supplier = suppliers.find((supplier) => supplier.accountID === transaction.Lines.DebitLine.AccountID);

                    if(supplier) {
                        supplier.debitLines.push(transaction.Lines.DebitLine);
                    }
                } else {
                    // multiple DebitLine
                    transaction.Lines.DebitLine.forEach((debitLine) => {
                        const supplier = suppliers.find((supplier) => supplier.accountID === debitLine.AccountID);

                        if(supplier) {
                            supplier.debitLines.push(debitLine);
                        }
                    });
                }

                // Credit lines
                if (transaction.Lines.CreditLine.hasOwnProperty("RecordID")) {
                    // single CreditLine
                    const supplier = suppliers.find((supplier) => supplier.accountID === transaction.Lines.CreditLine.AccountID);

                    if(supplier) {
                        supplier.creditLines.push(transaction.Lines.CreditLine);
                    }
                } else {
                    // multiple CreditLine
                    transaction.Lines.CreditLine.forEach((creditLine) => {
                        const supplier = suppliers.find((supplier) => supplier.accountID === creditLine.AccountID);

                        if(supplier) {
                            supplier.creditLines.push(creditLine);
                        }
                    });
                }
            });
        });

        res.json(suppliers.map((supplier) => {
            let ordered = supplier.openingCreditBalance;
            supplier.creditLines.forEach((creditLine) => {
                ordered += creditLine.CreditAmount;
            });

            let supplied = supplier.openingDebitBalance;
            supplier.debitLines.forEach((debitLine) => {
                supplied += debitLine.DebitAmount;              
            });

            if(supplied === 0 && ordered === 0) supplied = 1;
            if(ordered === 0) ordered = 1;

            return {
                companyName: supplier.companyName,
                accountID: supplier.accountID,
                qualityRating: Math.min(supplied / ordered, 1.0)
            }
        }).sort((a, b) => a.qualityRating - b.qualityRating));
    });
}

const orderedUntil = (initialOrder, creditLines, date) => {
    let ordered = initialOrder;
    const dateObj = new Date(date);

    for (const creditLine of creditLines) {
        const creditLineDate = new Date(creditLine.SystemEntryDate);

        if (dateObj.getTime() < creditLineDate.getTime()) break;

        ordered += creditLine.CreditAmount;
    }

    return ordered;
}
