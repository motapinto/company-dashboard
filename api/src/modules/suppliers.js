export default (server, db) => {
    server.get('/Supplier/spending', (req, res) => {
        const suppliers = [];

        for (const supplierElement of db.Supplier) {
            if(supplierElement.AccountID === "Desconhecido") {
                continue;
            }

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
}