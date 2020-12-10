export default (server, db) => {
    server.get('/balanceSheet', (req, res) => {
        let balanceSheet = createBalanceSheet();

        db.GeneralLedgerAccounts.Account.forEach(account => {
            const taxonomyCode = account.TaxonomyCode;
            const accountBalance = parseFloat(account.ClosingDebitBalance- account.ClosingCreditBalance);
            const isPositive = (accountBalance > 0);
            
            if(accountBalance === 0 || taxonomyCode === undefined) return;

            switch (true) {
                case taxonomyCode <= 3:
                    isPositive ? 
                    addValue(balanceSheet, ['Ativo', 'Total do Ativo corrente'], Math.abs(accountBalance)) :
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 4:
                case taxonomyCode == 6:
                    addValue(balanceSheet, ['Ativo', 'Total do Ativo não corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 5:
                case taxonomyCode == 7:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 8:
                    addValue(balanceSheet, ['Ativo', 'Total do Ativo corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 9:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 23:
                    isPositive ? addValue(balanceSheet, ['Ativo', 'Total do Ativo corrente'], Math.abs(accountBalance)) : 
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 36:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo corrente'], Math.abs(accountBalance));
                    break;       
                case taxonomyCode <= 50:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 59:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 61:
                case taxonomyCode == 63:
                case taxonomyCode == 65:
                case taxonomyCode == 66:
                case taxonomyCode == 67:
                case taxonomyCode == 69:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 58:
                case taxonomyCode == 60:
                case taxonomyCode == 62:
                case taxonomyCode == 64:
                case taxonomyCode == 68:
                case taxonomyCode == 70:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo não corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 85:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo corrente'], Math.abs(accountBalance));                   
                    break;
                case taxonomyCode == 86:
                case taxonomyCode == 88:
                case taxonomyCode == 90:
                case taxonomyCode == 92:
                case taxonomyCode == 94:
                case taxonomyCode == 96:
                case taxonomyCode == 98:
                case taxonomyCode == 100:
                case taxonomyCode == 102:
                case taxonomyCode == 104:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 87:
                case taxonomyCode == 89:
                case taxonomyCode == 91:
                case taxonomyCode == 93:
                case taxonomyCode == 95:
                case taxonomyCode == 97:
                case taxonomyCode == 99:
                case taxonomyCode == 101:
                case taxonomyCode == 103:
                case taxonomyCode == 105:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo não corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 106:
                case taxonomyCode == 107:
                    addValue(balanceSheet, ['Ativo', 'Total do Ativo corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 123:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo não corrente']);
                    break;
                case taxonomyCode == 124:
                case taxonomyCode == 126:
                case taxonomyCode == 128:
                case taxonomyCode == 138:
                case taxonomyCode == 140:
                case taxonomyCode == 142:
                case taxonomyCode == 144:
                    isPositive ?
                    addValue(balanceSheet, ['Ativo', 'Total do Ativo corrente'], Math.abs(accountBalance)) :
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 125:
                case taxonomyCode == 127:
                case taxonomyCode == 129:
                case taxonomyCode == 139: 
                case taxonomyCode == 141:
                case taxonomyCode == 143:
                case taxonomyCode == 145:
                    isPositive ? 
                    addValue(balanceSheet, ['Ativo', 'Total do Ativo não corrente'], Math.abs(accountBalance)) : 
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo não corrente'], Math.abs(accountBalance)); 
                    break;
                case taxonomyCode == 131:
                case taxonomyCode == 132:
                case taxonomyCode == 135:
                case taxonomyCode == 136:
                case taxonomyCode == 137:
                case taxonomyCode == 134:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 146:
                    addValue(balanceSheet, ['Ativo', 'Total do Ativo corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 147:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 155:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo não corrente'], Math.abs(accountBalance));
                    break; 
                case taxonomyCode <= 214:
                    isPositive ? 
                    addValue(balanceSheet, ['Ativo', 'Total do Ativo corrente'], Math.abs(accountBalance)) :
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 258:
                    isPositive ? 
                    addValue(balanceSheet, ['Ativo', 'Total do Ativo corrente'], Math.abs(accountBalance)) :
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Total do Passivo corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 319:
                    addValue(balanceSheet, ['Ativo', 'Total do Ativo não corrente'], Math.abs(accountBalance));
                    break;        
                case taxonomyCode <= 324:
                    addValue(balanceSheet, ['Ativo', 'Total do Ativo corrente'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 352:
                    isPositive ?
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Capital Próprio', 'Total do Capital Próprio'], Math.abs(accountBalance)) :
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Capital Próprio', 'Total do Capital Próprio'], Math.abs(accountBalance));
                    break;    
                case taxonomyCode == 646:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Capital Próprio', 'Total do Capital Próprio'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 647:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Capital Próprio', 'Total do Capital Próprio'], Math.abs(accountBalance));
                    break
                default:
                    console.log('Unhandled Taxonomy Code:', taxonomyCode, '\tWith balance of:', Math.abs(accountBalance));
                    break;
            }
        });

        balanceSheet['Ativo']['Total do Ativo'] = balanceSheet['Ativo']['Total do Ativo corrente'] + balanceSheet['Ativo']['Total do Ativo não corrente'];
        balanceSheet['Capital Próprio e Passivo']['Passivo']['Total do Passivo'] = balanceSheet['Capital Próprio e Passivo']['Passivo']['Total do Passivo corrente'] + balanceSheet['Capital Próprio e Passivo']['Passivo']['Total do Passivo não corrente'];
        balanceSheet['Capital Próprio e Passivo']['Total do Capital Próprio e do Passivo'] = 
            balanceSheet['Capital Próprio e Passivo']['Passivo']['Total do Passivo']
            + balanceSheet['Capital Próprio e Passivo']['Capital Próprio']['Total do Capital Próprio'];
        
        res.json(balanceSheet);
    });
};

function addValue(obj, path, value) {
    let fullPath = obj[path[0]];
    for (let i = 1; i < path.length; i++) if (fullPath[path[i]]) fullPath = fullPath[path[i]];
    switch (path.length) {
        case 1: obj[path[0]] += value; break;
        case 2: obj[path[0]][path[1]] += value; break;
        case 3: obj[path[0]][path[1]][path[2]] += value; break;
        case 4: obj[path[0]][path[1]][path[2]][path[3]] += value; break;
        case 5: obj[path[0]][path[1]][path[2]][path[3]][path[4]] += value; break;
    }

}

function createBalanceSheet () {
    let balanceSheet = {
        'Ativo': {
            'Total do Ativo não corrente': 0,
            'Total do Ativo corrente': 0,
            'Total do Ativo': 0
        },

        'Capital Próprio e Passivo': {
            'Capital Próprio': {
                'Total do Capital Próprio': 0
            },

            'Passivo': {                
                'Total do Passivo não corrente': 0,
                'Total do Passivo corrente': 0,
                'Total do Passivo': 0
            },

            'Total do Capital Próprio e do Passivo': 0
        }
    }

    return balanceSheet;
};