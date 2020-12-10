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


            switch (taxonomyCode) {
                case taxonomyCode <= 3:
                    isPositive ? 
                    addValue(balanceSheet, ['Ativo', 'Ativo corrente', 'Caixa e depósitos bancários'], Math.abs(accountBalance)) :
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Financiamentos obtidos'], Math.abs(accountBalance));
                    break;
                case 4:
                case 6:
                    addValue(balanceSheet, ['Ativo', 'Ativo corrente', 'Ativos financeiros detidos para negociação'], Math.abs(accountBalance));
                    break;
                case 5:
                case 7:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Passivos financeiros detidos para negociação'], Math.abs(accountBalance));
                    break;
                case 8:
                    addValue(balanceSheet, ['Ativo', 'Ativo corrente', 'Outros ativos financeiros'], Math.abs(accountBalance));
                    break;
                case 9:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Outros passivos financeiros'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 22:
                    isPositive ? addValue(balanceSheet, ['Ativo', 'Ativo corrente', 'Clientes'], Math.abs(accountBalance)) : 
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Adiantamentos de clientes'], Math.abs(accountBalance));
                    break;
                case 23:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Adiantamentos de clientes'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 36:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Clientes'], Math.abs(accountBalance));
                    break;       
                case taxonomyCode <= 50:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Fornecedores'], Math.abs(accountBalance));
                    break;
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                case 59:
                case 61:
                case 63:
                case 65:
                case 66:
                case 67:
                case 69:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Outras dívidas a pagar'], Math.abs(accountBalance));
                    break;
                case 58:
                case 60:
                case 62:
                case 64:
                case 68:
                case 70:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Não Corrente', 'Outras dívidas a pagar'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 85:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Estado e outros entes públicos'], Math.abs(accountBalance));                   
                    break;
                case 86:
                case 88:
                case 90:
                case 92:
                case 94:
                case 96:
                case 98:
                case 100:
                case 102:
                case 104:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Financiamentos obtidos'], Math.abs(accountBalance));
                    break;
                case 87:
                case 89:
                case 91:
                case 93:
                case 95:
                case 97:
                case 99:
                case 101:
                case 103:
                case 105:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Não Corrente', 'Financiamentos obtidos'], Math.abs(accountBalance));
                    break;
                case 106:
                case 107:
                    addValue(balanceSheet, ['Ativo', 'Ativo corrente', 'Capital subscrito e não realizado'], Math.abs(accountBalance));
                    break;
                case taxonomyCode <= 123:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Não Corrente', 'Outras dívidas a pagar']);
                    break;
                case 124:
                case 126:
                case 128:
                case 138:
                case 140:
                case 142:
                case 144:
                    isPositive ?
                    addValue(balanceSheet, ['Ativo', 'Ativo corrente', 'Outros créditos a receber'], Math.abs(accountBalance)) :
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Outras dívidas a pagar'], Math.abs(accountBalance));
                    break;
                case 125:
                case 127:
                case 129:
                case 139: 
                case 141:
                case 143:
                case 145:
                    isPositive ? 
                    addValue(balanceSheet, ['Ativo', 'Ativo não corrente', 'Créditos a receber'], Math.abs(accountBalance)) : 
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Não Corrente', 'Outras dívidas a pagar'], Math.abs(accountBalance)); 
                    break;
                case 131:
                case 132:
                case 135:
                case 136:
                case 137:
                case 134:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Outras dívidas a pagar'], Math.abs(accountBalance));
                    break;
                case 146:
                    addValue(balanceSheet, ['Ativo', 'Ativo corrente', 'Diferimentos'], Math.abs(accountBalance));
                    break;
                case 147:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Passivo', 'Passivo Corrente', 'Diferimentos'], Math.abs(accountBalance));
                    break;
                case 148:
                case 149:
                case 150:
                case 151:
                case 152:
                case 153:
                case 154:
                case 155:
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
                case 259:
                case 260:
                case 261:
                case 262:
                case 263:
                case 264:
                case 265:
                case 266:
                case 267:
                case 268:
                case 269:
                case 270:
                case 271:
                case 272:
                case 273:
                case 274:
                case 275:
                case 276:
                case 277:
                case 278:
                case 279:
                case 280:
                case 281:
                case 282:
                case 283:
                case 284:
                case 285:
                case 286:
                case 287:
                case 288:
                case 290:
                case 291:
                case 292:
                case 293:
                case 295:
                case 296:
                case 297:
                case 298:
                case 300:
                case 301:
                case 302:
                case 303:
                case 304:
                case 305:
                case 306:
                case 307:
                case 308:
                case 309:
                case 310:
                case 311:
                case 312:
                case 313:
                case 314:
                case 315:
                case 316:
                case 317:
                case 318:
                case 319:
                    addValue(balanceSheet, ['Ativo', 'Ativo não corrente', 'Propriedades de investimento'], Math.abs(accountBalance));
                    break;        
                case 320:
                case 321:
                case 322:
                case 323:
                case 324:
                    addValue(balanceSheet, ['Ativo', 'Ativo corrente', 'Ativos não correntes detidos para venda'], Math.abs(accountBalance));
                    break;
                case 325:
                case 326:
                case 327:
                case 328:
                case 329:
                case 330:
                case 331:
                case 332:
                case 333:
                case 334:
                case 335:
                case 336:
                case 337:
                case 338:
                case 339:
                case 340:
                case 341:
                case 342:
                case 343:
                case 344:
                case 345:
                case 346: 
                case 347:
                case 348:
                case 349:
                case 350:
                case 351:
                case 352:
                case 352:
                    isPositive ?
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Capital Próprio', 'Ajustamentos / outras variações no capital próprio'], Math.abs(accountBalance)) :
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Capital Próprio', 'Ajustamentos / outras variações no capital próprio'], Math.abs(accountBalance));
                    break;    
                case 646:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Capital Próprio', 'Resultado líquido do período'], Math.abs(accountBalance));
                    break;
                case 647:
                    addValue(balanceSheet, ['Capital Próprio e Passivo', 'Capital Próprio', 'Dividendos antecipados'], Math.abs(accountBalance));
                    break
                default:
                    console.log('Unhandled Taxonomy Code:', taxonomyCode, '\tWith balance of:', Math.abs(accountBalance));
                    break;
            }

            console.log(taxonomyCodesLeft);

        });

        console.log(taxonomyCodesLeft);
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