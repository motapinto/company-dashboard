export default (server, db) => {
    server.get('/balanceSheet', (req, res) => {
        let balanceSheet = createBalanceSheet();
        const taxonomyCodesLeft = new Set();

        db.GeneralLedgerAccounts.Account.forEach(account => {
            const taxonomyCode = account.TaxonomyCode;
            const accountBalance = parseFloat(account.ClosingDebitBalance- account.ClosingCreditBalance);
            const isPositive = (accountBalance > 0);
            
            if(accountBalance === 0 || taxonomyCode === undefined) return;
            taxonomyCodesLeft.add(taxonomyCode);


            switch (true) {
                case taxonomyCode <= 3:
                    isPositive ? 
                    addValue(balanceSheet, ['Ativo', 'Ativo corrente', 'Caixa e depósitos bancários'], Math.abs(accountBalance)) :
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Financiamentos obtidos'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 4:
                case taxonomyCode == 6:
                    addValue(balanceSheet, ['Ativo', 'Ativo corrente', 'Ativos financeiros detidos para negociação'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 5:
                case taxonomyCode == 7:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Passivos financeiros detidos para negociação'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 8:
                    addValue(balanceSheet, ['Ativo', 'Ativo corrente', 'Outros ativos financeiros'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 9:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Outros passivos financeiros'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 23:
                    isPositive ? addValue(balanceSheet, ['Ativo', 'Ativo corrente', 'Clientes'], Math.abs(accountBalance)) : 
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Adiantamentos de clientes'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 36:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Clientes'], Math.abs(accountBalance));
                    break;       
                case taxonomyCode <= 50:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Fornecedores'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 59:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Outras dívidas a pagar'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 61:
                case taxonomyCode == 63:
                case taxonomyCode == 65:
                case taxonomyCode == 66:
                case taxonomyCode == 67:
                case taxonomyCode == 69:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Outras dívidas a pagar'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 58:
                case taxonomyCode == 60:
                case taxonomyCode == 62:
                case taxonomyCode == 64:
                case taxonomyCode == 68:
                case taxonomyCode == 70:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Não Corrente', 'Outras dívidas a pagar'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 85:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Estado e outros entes públicos'], Math.abs(accountBalance));                   
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
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Financiamentos obtidos'], Math.abs(accountBalance));
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
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Não Corrente', 'Financiamentos obtidos'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 106:
                case taxonomyCode == 107:
                    addValue(balanceSheet, ['Ativo', 'Ativo corrente', 'Capital subscrito e não realizado'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 123:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Não Corrente', 'Outras dívidas a pagar']);
                    break;
                case taxonomyCode == 124:
                case taxonomyCode == 126:
                case taxonomyCode == 128:
                case taxonomyCode == 138:
                case taxonomyCode == 140:
                case taxonomyCode == 142:
                case taxonomyCode == 144:
                    isPositive ?
                    addValue(balanceSheet, ['Ativo', 'Ativo corrente', 'Outros créditos a receber'], Math.abs(accountBalance)) :
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Outras dívidas a pagar'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 125:
                case taxonomyCode == 127:
                case taxonomyCode == 129:
                case taxonomyCode == 139: 
                case taxonomyCode == 141:
                case taxonomyCode == 143:
                case taxonomyCode == 145:
                    isPositive ? 
                    addValue(balanceSheet, ['Ativo', 'Ativo não corrente', 'Créditos a receber'], Math.abs(accountBalance)) : 
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Não Corrente', 'Outras dívidas a pagar'], Math.abs(accountBalance)); 
                    break;
                case taxonomyCode == 131:
                case taxonomyCode == 132:
                case taxonomyCode == 135:
                case taxonomyCode == 136:
                case taxonomyCode == 137:
                case taxonomyCode == 134:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Outras dívidas a pagar'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 146:
                    addValue(balanceSheet, ['Ativo', 'Ativo corrente', 'Diferimentos'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 147:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Diferimentos'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 155:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Não Corrente', 'Provisões'], Math.abs(accountBalance));
                    break; 
                case taxonomyCode <= 214:
                    isPositive ? 
                    addValue(balanceSheet, ['Ativo', 'Ativo corrente', 'Inventários'], Math.abs(accountBalance)) :
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Outras dívidas a pagar'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 258:
                    isPositive ? 
                    addValue(balanceSheet, ['Ativo', 'Ativo não corrente', 'Outros investimentos financeiros'], Math.abs(accountBalance)) :
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Outras dívidas a pagar'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 319:
                    addValue(balanceSheet, ['Ativo', 'Ativo não corrente', 'Propriedades de investimento'], Math.abs(accountBalance));
                    break;        
                case taxonomyCode <= 324:
                    addValue(balanceSheet, ['Ativo', 'Ativo corrente', 'Ativos não correntes detidos para venda'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 352:
                    isPositive ?
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Capital Próprio', 'Ajustamentos / outras variações no capital próprio'], Math.abs(accountBalance)) :
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Capital Próprio', 'Ajustamentos / outras variações no capital próprio'], Math.abs(accountBalance));
                    break;    
                case taxonomyCode == 646:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Capital Próprio', 'Resultado líquido do período'], Math.abs(accountBalance));
                    break;
                case taxonomyCode == 647:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Capital Próprio', 'Dividendos antecipados'], Math.abs(accountBalance));
                    break
                default:
                    console.log('Unhandled Taxonomy Code:', taxonomyCode, '\tWith balance of:', Math.abs(accountBalance));
                    break;
            }
        });

        // ATIVO
        balanceSheet['Ativo']['Total do Ativo corrente'] = sumProperties(balanceSheet['Ativo']['Ativo corrente']);
        balanceSheet['Ativo']['Total do Ativo não corrente'] = sumProperties(balanceSheet['Ativo']['Ativo não corrente']);
        balanceSheet['Ativo']['Total do Ativo'] = balanceSheet['Ativo']['Total do Ativo corrente'] + balanceSheet['Ativo']['Total do Ativo não corrente'];

        // CAPITAL PRÓPRIO
        balanceSheet['Capital Próprio e Passivo']['Capital Próprio']['Total do Capital Próprio'] = sumProperties(balanceSheet['Capital Próprio e Passivo']['Capital Próprio']);

        // PASSIVO
        balanceSheet['Capital Próprio e Passivo']['Passivo']['Total do Passivo corrente'] = sumProperties(balanceSheet['Capital Próprio e Passivo']['Passivo']['Passivo Corrente']);
        balanceSheet['Capital Próprio e Passivo']['Passivo']['Total do Passivo não corrente'] = sumProperties(balanceSheet['Capital Próprio e Passivo']['Passivo']['Passivo Não Corrente']);
        balanceSheet['Capital Próprio e Passivo']['Passivo']['Total do Passivo'] = balanceSheet['Capital Próprio e Passivo']['Passivo']['Total do Passivo corrente'] + balanceSheet['Capital Próprio e Passivo']['Passivo']['Total do Passivo não corrente'];

        // CP + PASSIVO
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

function sumProperties (obj) {
    let count = 0;
    for (var key in obj) if (obj.hasOwnProperty(key)) count += obj[key];
    return count;
}

function createBalanceSheet () {
    let balanceSheet = {
        'Ativo': {
            'Ativo não corrente': {
                'Ativos fixos tangíveis': 0,                        // 268+269+270+271+272+273+274-275-276-277-278-279-280-281-282-283-284-285-286-287-288+306+310-314-318
                'Propriedades de investimento': 0,                  // 259+260+261-262-263-264-265-266-267+305+309-313-317
                'Goodwill': 0,                                      // 217+222+227-236-237-238-240-245-250+289-294-299
                'Ativos intangíveis': 0,                            // 290+291+292+293-295-296-297-298-300-301-302-303+307+311-315-319
                'Ativos biológicos': 0,                             // 197+198-200-202+215
                'Participações financeiras': 0,                     // 216+221+226-239-244-249
                'Outros investimentos financeiros': 0,              // 218+219+220+223+224+225+228+229+230+231+232+233+234+235-241-242-243-246-247-248-251-252-253-254-255-256-257-258+304+308-312-316
                'Créditos a receber': 0,                            // 62+64-68-70+112+114-121-123+125+127+129+139-141-145 (Se saldo devedor ver taxonomias)  -  62+64+114+125+127+139
                'Ativos por impostos diferidos': 0,                 // 133-143
            },

            'Ativo corrente': {
                'Inventários': 0,                                   //  165+166+167-168-169-170+171+172+173+174+175+176-177-178-179-180-181-182+183+184-185-186+187+188+189-190-191-192+193-194+209+210+211+212+213
                'Ativos biológicos': 0,                             //  195+196-199-201+214
                'Clientes': 0,                                      //  10+11+12+13+14+15+16+17+18+19+20+21+22-24-25-26-27-28-29-30-31-32-33-34-35-36 (Se saldo devedor, ver taxonomias)  -  10+11+12+13+14+15+16+17+18+19+20+21+22
                'Estado e outros entes públicos': 0,                //  71+73+74+76+77+79+80+81+82+83+84+85 (Se saldo devedor, ver taxonomias)  -  71+76+77+81+82+83+84+85 
                'Capital subscrito e não realizado': 0,             //  106+107-115-116
                'Outros créditos a receber': 0,                     //  37+38+39+40+41+42+43+44+45+46+47+48+49+50+51-52+55+56+61+63-65-66-67-69+108+109+110+111+113-117-118-119-120-122+124+126+128+130+138-140-142-144 (Se Saldo devedor, ver taxonomias)  -  37+38+39+40+41+42+43+44+45+46+47+48+49+50+61+63+109+110+113+124+126+138
                'Diferimentos': 0,                                  //  146
                'Ativos financeiros detidos para negociação': 0,    //  4+6
                'Outros ativos financeiros': 0,                     //  8
                'Ativos não correntes detidos para venda': 0,       //  320+321+322+323+324-326-327-328-329-330
                'Caixa e depósitos bancários': 0                    //  1+2+3 (Se Saldo devedor, ver taxonomias)  -  2+3
            },

            'Total do Ativo não corrente': 0,
            'Total do Ativo corrente': 0,
            'Total do Ativo': 0
        },

        'Capital Próprio e Passivo': {
            'Capital Próprio': {
                'Capital subscrito': 0,                                     //  331
                'Ações (quotas) próprias': 0,                               //  -332 +/- 333 [(-) Se saldo devedor e (+) Se saldo credor]
                'Outros instrumentos de capital próprio': 0,                //  334
                'Prémios de emissão': 0,                                    //  335
                'Reservas legais': 0,                                       //  336 
                'Outras reservas': 0,                                       //  337
                'Resultados transitados': 0,                                //  +/-338 [(-) Se saldo devedor e (+) Se saldo credor]
                'Excedentes de revalorização': 0,                           //  343-344+345-346
                'Ajustamentos / outras variações no capital próprio': 0,    //  -339+340-341-342-347-348+349-350+351-352 (Se Saldo devedor, ver taxonomias)  -  +/-339 +/-341 +/-342 +/-347 +/-348 +/-352 [(-) Se saldo devedor e(+) Se saldo credor]
                'Resultado líquido do período': 0,                          //  -646 (Se Saldo devedor, ver taxonomias)  -   +/-646 [(-) Se saldo devedor e (+) Se saldo credor]
                'Dividendos antecipados': 0,                                //  -647

                'Total do Capital Próprio': 0
            },

            'Passivo': {
                'Passivo Não Corrente': {
                    'Provisões': 0,                                         //  148+149+150+151+152+153+154+155
                    'Financiamentos obtidos': 0,                            //  87+89+91+93+95+97+99+101+103+105
                    'Responsabilidades por benefícios pós-emprego': 0,      //  132
                    'Passivos por impostos diferidos': 0,                   //  134
                    'Outras dívidas a pagar': 0                             //  58+60+62+64+114+125+127+136+139 (Se Saldo credor, ver taxonomias)  -  62+64+114+125+127+139 (Se saldo credor)
                },
                'Passivo Corrente': {
                    'Clientes': 0,    
                    'Fornecedores': 0,                                      //  37+38+39+40+41+42+43+44+45+46+47+48+49+50           (Se Saldo credor, ver taxonomias)  -  37+38+39+40+41+42+43+44+45+46+47+48+49+50
                    'Adiantamentos de clientes': 0,                         //  10+11+12+13+14+15+16+17+18+19+20+21+22+23+137       (Se Saldo credor, ver taxonomias)  -  10+11+12+13+14+15+16+17+18+19+20+21+22
                    'Estado e outros entes públicos': 0,                    //  71+72+75+76+77+78+81+82+83+84+85                    (Se Saldo credor, ver taxonomias)  -  71+76+77+81+82+83+84+85
                    'Financiamentos obtidos': 0,                            //  2+3+86+88+90+92+94+96+98+100+102+104                (Se Saldo credor, ver taxonomias)  -  2+3
                    'Outras dívidas a pagar': 0,                            //  53+54+57+59+61+63+109+110+113+124+126+131+135+138   (Se Saldo credor, ver taxonomias)  -  61+63+109+110+113+124+126+138 
                    'Diferimentos': 0,                                      //  147
                    'Passivos financeiros detidos para negociação': 0,      //  5+7
                    'Outros passivos financeiros': 0,                       //  9
                    'Passivos não correntes detidos para venda': 0,         //  325
                },
                
                'Total do Passivo não corrente': 0,
                'Total do Passivo corrente': 0,
                'Total do Passivo': 0
            },

            'Total do Capital Próprio e do Passivo': 0
        }
    }

    return balanceSheet;
};