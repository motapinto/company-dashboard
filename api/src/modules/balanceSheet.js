export default (server, db) => {
  server.get("/balanceSheet", (_req, res) => {
    let balanceSheet = {
      Ativo: {
        "Ativo não corrente": {
          "Ativos fixos tangíveis": 0, // 268+269+270+271+272+273+274-275-276-277-278-279-280-281-282-283-284-285-286-287-288+306+310-314-318
          "Propriedades de investimento": 0, // 259+260+261-262-263-264-265-266-267+305+309-313-317
          Goodwill: 0, // 217+222+227-236-237-238-240-245-250+289-294-299
          "Ativos intangíveis": 0, // 290+291+292+293-295-296-297-298-300-301-302-303+307+311-315-319
          "Ativos biológicos": 0, // 197+198-200-202+215
          "Participações financeiras": 0, // 216+221+226-239-244-249
          "Outros investimentos financeiros": 0, // 218+219+220+223+224+225+228+229+230+231+232+233+234+235-241-242-243-246-247-248-251-252-253-254-255-256-257-258+304+308-312-316
          "Créditos a receber": 0, // 62+64-68-70+112+114-121-123+125+127+129+139-141-145 (Se saldo devedor ver taxonomias)  -  62+64+114+125+127+139
          "Ativos por impostos diferidos": 0, // 133-143
        },

        "Ativo corrente": {
          Inventários: 0, //  165+166+167-168-169-170+171+172+173+174+175+176-177-178-179-180-181-182+183+184-185-186+187+188+189-190-191-192+193-194+209+210+211+212+213
          "Ativos biológicos": 0, //  195+196-199-201+214
          Clientes: 0, //  10+11+12+13+14+15+16+17+18+19+20+21+22-24-25-26-27-28-29-30-31-32-33-34-35-36 (Se saldo devedor, ver taxonomias)  -  10+11+12+13+14+15+16+17+18+19+20+21+22
          "Estado e outros entes públicos": 0, //  71+73+74+76+77+79+80+81+82+83+84+85 (Se saldo devedor, ver taxonomias)  -  71+76+77+81+82+83+84+85
          "Capital subscrito e não realizado": 0, //  106+107-115-116
          "Outros créditos a receber": 0, //  37+38+39+40+41+42+43+44+45+46+47+48+49+50+51-52+55+56+61+63-65-66-67-69+108+109+110+111+113-117-118-119-120-122+124+126+128+130+138-140-142-144 (Se Saldo devedor, ver taxonomias)  -  37+38+39+40+41+42+43+44+45+46+47+48+49+50+61+63+109+110+113+124+126+138
          Diferimentos: 0, //  146
          "Ativos financeiros detidos para negociação": 0, //  4+6
          "Outros ativos financeiros": 0, //  8
          "Ativos não correntes detidos para venda": 0, //  320+321+322+323+324-326-327-328-329-330
          "Caixa e depósitos bancários": 0, //  1+2+3 (Se Saldo devedor, ver taxonomias)  -  2+3
        },

        "Total do Ativo não corrente": 0,
        "Total do Ativo corrente": 0,
        "Total do Ativo": 0,
      },

      "Capital Próprio e Passivo": {
        "Capital Próprio": {
          "Capital subscrito": 0, //  331
          "Ações (quotas) próprias": 0, //  -332 +/- 333 [(-) Se saldo devedor e (+) Se saldo credor]
          "Outros instrumentos de capital próprio": 0, //  334
          "Prémios de emissão": 0, //  335
          "Reservas legais": 0, //  336
          "Outras reservas": 0, //  337
          "Resultados transitados": 0, //  +/-338 [(-) Se saldo devedor e (+) Se saldo credor]
          "Excedentes de revalorização": 0, //  343-344+345-346
          "Ajustamentos / outras variações no capital próprio": 0, //  -339+340-341-342-347-348+349-350+351-352 (Se Saldo devedor, ver taxonomias)  -  +/-339 +/-341 +/-342 +/-347 +/-348 +/-352 [(-) Se saldo devedor e(+) Se saldo credor]
          "Resultado líquido do período": 0, //  -646 (Se Saldo devedor, ver taxonomias)  -   +/-646 [(-) Se saldo devedor e (+) Se saldo credor]
          "Dividendos antecipados": 0, //  -647

          "Total do Capital Próprio": 0,
        },

        Passivo: {
          "Passivo Não Corrente": {
            Provisões: 0, //  148+149+150+151+152+153+154+155
            "Financiamentos obtidos": 0, //  87+89+91+93+95+97+99+101+103+105
            "Responsabilidades por benefícios pós-emprego": 0, //  132
            "Passivos por impostos diferidos": 0, //  134
            "Outras dívidas a pagar": 0, //  58+60+62+64+114+125+127+136+139 (Se Saldo credor, ver taxonomias)  -  62+64+114+125+127+139 (Se saldo credor)
          },
          "Passivo Corrente": {
            Fornecedores: 0, //  37+38+39+40+41+42+43+44+45+46+47+48+49+50           (Se Saldo credor, ver taxonomias)  -  37+38+39+40+41+42+43+44+45+46+47+48+49+50
            "Adiantamentos de clientes": 0, //  10+11+12+13+14+15+16+17+18+19+20+21+22+23+137       (Se Saldo credor, ver taxonomias)  -  10+11+12+13+14+15+16+17+18+19+20+21+22
            "Estado e outros entes públicos": 0, //  71+72+75+76+77+78+81+82+83+84+85                    (Se Saldo credor, ver taxonomias)  -  71+76+77+81+82+83+84+85
            "Financiamentos obtidos": 0, //  2+3+86+88+90+92+94+96+98+100+102+104                (Se Saldo credor, ver taxonomias)  -  2+3
            "Outras dívidas a pagar": 0, //  53+54+57+59+61+63+109+110+113+124+126+131+135+138   (Se Saldo credor, ver taxonomias)  -  61+63+109+110+113+124+126+138
            Diferimentos: 0, //  147
            "Passivos financeiros detidos para negociação": 0, //  5+7
            "Outros passivos financeiros": 0, //  9
            "Passivos não correntes detidos para venda": 0, //  325
          },

          "Total do Passivo não corrente": 0,
          "Total do Passivo corrente": 0,
          "Total do Passivo": 0,
        },

        "Total do Capital Próprio e do Passivo": 0,
      },
    };

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
        //=======================//
        // CASES WITH ADDITIONAL LOGIC
        //=======================//
        case 62:
        case 64:
        case 114:
        case 125:
        case 127:
        case 139:
          if (isSaldoDevedor) {
            addValue(
              balanceSheet,
              ["Ativo", "Ativo não corrente", "Créditos a receber"],
              accountBal
            );
          } else {
            addValue(
              balanceSheet,
              [
                "Capital Próprio e Passivo",
                "Passivo",
                "Passivo Não Corrente",
                "Outras dívidas a pagar",
              ],
              accountBal
            );
          }
          break;
        //=======================//
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
          if (isSaldoDevedor) {
            addValue(
              balanceSheet,
              ["Ativo", "Ativo corrente", "Clientes"],
              accountBal
            );
          } else {
            addValue(
              balanceSheet,
              [
                "Capital Próprio e Passivo",
                "Passivo",
                "Passivo Corrente",
                "Adiantamentos de clientes",
              ],
              accountBal
            );
          }
          break;
        //=======================//
        case 71:
        case 76:
        case 77:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
          if (isSaldoDevedor) {
            addValue(
              balanceSheet,
              ["Ativo", "Ativo corrente", "Estado e outros entes públicos"],
              accountBal
            );
          } else {
            addValue(
              balanceSheet,
              [
                "Capital Próprio e Passivo",
                "Passivo",
                "Passivo Corrente",
                "Estado e outros entes públicos",
              ],
              accountBal
            );
          }
          break;
        //=======================//
        case 2:
        case 3:
          if (isSaldoDevedor) {
            addValue(
              balanceSheet,
              ["Ativo", "Ativo corrente", "Caixa e depósitos bancários"],
              accountBal
            );
          } else {
            addValue(
              balanceSheet,
              [
                "Capital Próprio e Passivo",
                "Passivo",
                "Passivo Corrente",
                "Financiamentos obtidos",
              ],
              accountBal
            );
          }
          break;
        //=======================//
        case 332:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Capital Próprio",
              "Ações (quotas) próprias",
            ],
            -accountBal
          );
          break;
        case 333:
          if (isSaldoDevedor) {
            addValue(
              balanceSheet,
              [
                "Capital Próprio e Passivo",
                "Capital Próprio",
                "Ações (quotas) próprias",
              ],
              -accountBal
            );
          } else {
            addValue(
              balanceSheet,
              [
                "Capital Próprio e Passivo",
                "Capital Próprio",
                "Ações (quotas) próprias",
              ],
              accountBal
            );
          }
          break;
        //=======================//
        case 338:
          if (isSaldoDevedor) {
            addValue(
              balanceSheet,
              [
                "Capital Próprio e Passivo",
                "Capital Próprio",
                "Resultados transitados",
              ],
              -accountBal
            );
          } else {
            addValue(
              balanceSheet,
              [
                "Capital Próprio e Passivo",
                "Capital Próprio",
                "Resultados transitados",
              ],
              accountBal
            );
          }
          break;
        //=======================//
        case 646:
          if (isSaldoDevedor) {
            addValue(
              balanceSheet,
              [
                "Capital Próprio e Passivo",
                "Capital Próprio",
                "Resultado líquido do período",
              ],
              -accountBal
            );
          } else {
            addValue(
              balanceSheet,
              [
                "Capital Próprio e Passivo",
                "Capital Próprio",
                "Resultado líquido do período",
              ],
              accountBal
            );
          }
          break;
        //=======================//
        case 339:
        case 341:
        case 342:
        case 347:
        case 348:
        case 352:
          if (isSaldoDevedor) {
            addValue(
              balanceSheet,
              [
                "Capital Próprio e Passivo",
                "Capital Próprio",
                "Ajustamentos / outras variações no capital próprio",
              ],
              -accountBal
            );
          } else {
            addValue(
              balanceSheet,
              [
                "Capital Próprio e Passivo",
                "Capital Próprio",
                "Ajustamentos / outras variações no capital próprio",
              ],
              accountBal
            );
          }
          break;
        //=======================//
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
        case 48:
        case 49:
        case 50:
          if (isSaldoDevedor) {
            addValue(
              balanceSheet,
              ["Ativo", "Ativo corrente", "Outros créditos a receber"],
              accountBal
            );
          } else {
            addValue(
              balanceSheet,
              [
                "Capital Próprio e Passivo",
                "Passivo",
                "Passivo Corrente",
                "Fornecedores",
              ],
              accountBal
            );
          }
          break;
        case 61:
        case 63:
        case 109:
        case 110:
        case 113:
        case 124:
        case 126:
        case 138:
          if (isSaldoDevedor) {
            addValue(
              balanceSheet,
              ["Ativo", "Ativo corrente", "Outros créditos a receber"],
              accountBal
            );
          } else {
            addValue(
              balanceSheet,
              [
                "Capital Próprio e Passivo",
                "Passivo",
                "Passivo Corrente",
                "Outras dívidas a pagar",
              ],
              accountBal
            );
          }
          break;
        //=======================//

        //=======================//
        // REGULAR CASES
        //=======================//
        // ATIVO NÃO CORRENTE
        //=======================//
        case 268:
        case 269:
        case 270:
        case 271:
        case 272:
        case 273:
        case 274:
        case 306:
        case 310:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo não corrente", "Ativos fixos tangíveis"],
            accountBal
          );
          break;
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
        case 314:
        case 318:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo não corrente", "Ativos fixos tangíveis"],
            -accountBal
          );
          break;
        //=======================//
        case 259:
        case 260:
        case 261:
        case 305:
        case 309:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo não corrente", "Propriedades de investimento"],
            accountBal
          );
          break;
        case 262:
        case 263:
        case 264:
        case 265:
        case 266:
        case 267:
        case 313:
        case 317:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo não corrente", "Propriedades de investimento"],
            -accountBal
          );
          break;
        //=======================//
        case 217:
        case 222:
        case 227:
        case 289:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo não corrente", "Goodwill"],
            accountBal
          );
          break;
        case 236:
        case 237:
        case 238:
        case 240:
        case 245:
        case 250:
        case 294:
        case 299:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo não corrente", "Goodwill"],
            -accountBal
          );
          break;
        //=======================//
        case 290:
        case 291:
        case 292:
        case 293:
        case 307:
        case 311:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo não corrente", "Ativos intangíveis"],
            accountBal
          );
          break;
        case 295:
        case 296:
        case 297:
        case 298:
        case 300:
        case 301:
        case 302:
        case 303:
        case 315:
        case 319:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo não corrente", "Ativos intangíveis"],
            -accountBal
          );
          break;
        //=======================//
        case 197:
        case 198:
        case 215:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo não corrente", "Ativos biológicos"],
            accountBal
          );
          break;
        case 200:
        case 202:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo não corrente", "Ativos biológicos"],
            -accountBal
          );
          break;
        //=======================//
        case 216:
        case 221:
        case 226:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo não corrente", "Participações financeiras"],
            accountBal
          );
          break;
        case 239:
        case 244:
        case 249:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo não corrente", "Participações financeiras"],
            -accountBal
          );
          break;
        //=======================//
        case 218:
        case 219:
        case 220:
        case 223:
        case 224:
        case 225:
        case 228:
        case 229:
        case 230:
        case 231:
        case 232:
        case 233:
        case 234:
        case 235:
        case 304:
        case 308:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo não corrente", "Outros investimentos financeiros"],
            accountBal
          );
          break;
        case 241:
        case 242:
        case 243:
        case 246:
        case 247:
        case 248:
        case 251:
        case 252:
        case 253:
        case 254:
        case 255:
        case 256:
        case 257:
        case 258:
        case 312:
        case 316:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo não corrente", "Outros investimentos financeiros"],
            -accountBal
          );
          break;
        //=======================//
        case 112:
        case 129:
        case 62:
        case 64:
        case 114:
        case 125:
        case 127:
        case 139:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo não corrente", "Créditos a receber"],
            accountBal
          );
          break;
        case 68:
        case 70:
        case 121:
        case 123:
        case 141:
        case 145:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo não corrente", "Créditos a receber"],
            -accountBal
          );
          break;
        //=======================//
        case 133:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo não corrente", "Ativos por impostos diferidos"],
            accountBal
          );
          break;
        case 143:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo não corrente", "Ativos por impostos diferidos"],
            -accountBal
          );
          break;
        //=======================//

        //=======================//
        // ATIVO CORRENTE
        //=======================//
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
          addValue(
            balanceSheet,
            ["Ativo", "Ativo corrente", "Inventários"],
            accountBal
          );
          break;
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
          addValue(
            balanceSheet,
            ["Ativo", "Ativo corrente", "Inventários"],
            -accountBal
          );
          break;
        //=======================//
        case 195:
        case 196:
        case 214:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo corrente", "Ativos biológicos"],
            accountBal
          );
          break;
        case 199:
        case 201:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo corrente", "Ativos biológicos"],
            -accountBal
          );
          break;
        //=======================//
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo corrente", "Clientes"],
            accountBal
          );
          break;
        case 24:
        case 25:
        case 26:
        case 27:
        case 28:
        case 29:
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 36:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo corrente", "Clientes"],
            -accountBal
          );
          break;
        //=======================//
        case 73:
        case 74:
        case 79:
        case 80:
        case 71:
        case 76:
        case 77:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo corrente", "Estado e outros entes públicos"],
            accountBal
          );
          break;
        //=======================//
        case 106:
        case 107:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo corrente", "Capital subscrito e não realizado"],
            accountBal
          );
          break;
        case 115:
        case 116:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo corrente", "Capital subscrito e não realizado"],
            -accountBal
          );
          break;
        //=======================//
        case 51:
        case 55:
        case 56:
        case 108:
        case 111:
        case 128:
        case 130:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
        case 48:
        case 49:
        case 50:
        case 61:
        case 63:
        case 109:
        case 110:
        case 113:
        case 124:
        case 126:
        case 138:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo corrente", "Outros créditos a receber"],
            accountBal
          );
          break;
        case 52:
        case 65:
        case 66:
        case 67:
        case 69:
        case 117:
        case 118:
        case 119:
        case 120:
        case 122:
        case 140:
        case 142:
        case 144:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo corrente", "Outros créditos a receber"],
            -accountBal
          );
          break;
        //=======================//
        case 146:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo corrente", "Diferimentos"],
            accountBal
          );
          break;
        //=======================//
        case 4:
        case 6:
          addValue(
            balanceSheet,
            [
              "Ativo",
              "Ativo corrente",
              "Ativos financeiros detidos para negociação",
            ],
            accountBal
          );
          break;
        //=======================//
        case 8:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo corrente", "Outros ativos financeiros"],
            accountBal
          );
          break;
        //=======================//
        case 320:
        case 321:
        case 322:
        case 323:
        case 324:
          addValue(
            balanceSheet,
            [
              "Ativo",
              "Ativo corrente",
              "Ativos não correntes detidos para venda",
            ],
            accountBal
          );
          break;
        case 326:
        case 327:
        case 328:
        case 329:
        case 330:
          addValue(
            balanceSheet,
            [
              "Ativo",
              "Ativo corrente",
              "Ativos não correntes detidos para venda",
            ],
            -accountBal
          );
          break;
        //=======================//
        case 1:
        case 2:
        case 3:
          addValue(
            balanceSheet,
            ["Ativo", "Ativo corrente", "Caixa e depósitos bancários"],
            accountBal
          );
          break;
        //=======================//
        // CAPITAL PROPRIO
        //=======================//
        case 331:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Capital Próprio",
              "Capital subscrito",
            ],
            accountBal
          );
          break;
        //=======================//
        case 332:
        case 333:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Capital Próprio",
              "Ações (quotas) próprias",
            ],
            -accountBal
          );
          break;
        //=======================//
        case 334:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Capital Próprio",
              "Outros instrumentos de capital próprio",
            ],
            accountBal
          );
          break;
        //=======================//
        case 335:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Capital Próprio",
              "Prémios de emissão",
            ],
            accountBal
          );
          break;
        //=======================//
        case 336:
          addValue(
            balanceSheet,
            ["Capital Próprio e Passivo", "Capital Próprio", "Reservas legais"],
            accountBal
          );
          break;
        //=======================//
        case 337:
          addValue(
            balanceSheet,
            ["Capital Próprio e Passivo", "Capital Próprio", "Outras reservas"],
            accountBal
          );
          break;
        //=======================//
        case 343:
        case 345:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Capital Próprio",
              "Excedentes de revalorização",
            ],
            accountBal
          );
          break;
        case 344:
        case 346:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Capital Próprio",
              "Excedentes de revalorização",
            ],
            -accountBal
          );
          break;
        //=======================//
        case 340:
        case 349:
        case 351:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Capital Próprio",
              "Ajustamentos / outras variações no capital próprio",
            ],
            accountBal
          );
          break;
        case 350:
        case 339:
        case 341:
        case 342:
        case 347:
        case 348:
        case 352:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Capital Próprio",
              "Ajustamentos / outras variações no capital próprio",
            ],
            -accountBal
          );
          break;
        //=======================//
        case 646:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Capital Próprio",
              "Resultado líquido do período",
            ],
            -accountBal
          );
          break;
        //=======================//
        case 647:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Capital Próprio",
              "Dividendos antecipados",
            ],
            -accountBal
          );
          break;
        //=======================//
        // PASSIVO NÃO CORRENTE
        //=======================//
        case 148:
        case 149:
        case 150:
        case 151:
        case 152:
        case 153:
        case 154:
        case 155:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Passivo",
              "Passivo Não Corrente",
              "Provisões",
            ],
            accountBal
          );
          break;
        //=======================//
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
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Passivo",
              "Passivo Não Corrente",
              "Financiamentos obtidos",
            ],
            accountBal
          );
          break;
        //=======================//
        case 132:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Passivo",
              "Passivo Não Corrente",
              "Responsabilidades por benefícios pós-emprego",
            ],
            accountBal
          );
          break;
        //=======================//
        case 134:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Passivo",
              "Passivo Não Corrente",
              "Passivos por impostos diferidos",
            ],
            accountBal
          );
          break;
        //=======================//
        case 58:
        case 60:
        case 136:
        case 62:
        case 64:
        case 114:
        case 125:
        case 127:
        case 139:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Passivo",
              "Passivo Não Corrente",
              "Outras dívidas a pagar",
            ],
            accountBal
          );
          break;
        //=======================//
        // PASSIVO CORRENTE
        //=======================//
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
        case 48:
        case 49:
        case 50:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Passivo",
              "Passivo Corrente",
              "Fornecedores",
            ],
            accountBal
          );
          break;
        //=======================//
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 137:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Passivo",
              "Passivo Corrente",
              "Adiantamentos de clientes",
            ],
            accountBal
          );
          break;
        //=======================//
        case 72:
        case 75:
        case 78:
        case 71:
        case 76:
        case 77:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Passivo",
              "Passivo Corrente",
              "Estado e outros entes públicos",
            ],
            accountBal
          );
          break;
        //=======================//
        case 2:
        case 3:
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
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Passivo",
              "Passivo Corrente",
              "Financiamentos obtidos",
            ],
            accountBal
          );
          break;
        //=======================//
        case 53:
        case 54:
        case 57:
        case 59:
        case 131:
        case 135:
        case 61:
        case 63:
        case 109:
        case 110:
        case 113:
        case 124:
        case 126:
        case 138:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Passivo",
              "Passivo Corrente",
              "Outras dívidas a pagar",
            ],
            accountBal
          );
          break;
        //=======================//
        case 147:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Passivo",
              "Passivo Corrente",
              "Diferimentos",
            ],
            accountBal
          );
          break;
        //=======================//
        case 5:
        case 7:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Passivo",
              "Passivo Corrente",
              "Passivos financeiros detidos para negociação",
            ],
            accountBal
          );
          break;
        //=======================//
        case 9:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Passivo",
              "Passivo Corrente",
              "Outros passivos financeiros",
            ],
            accountBal
          );
          break;
        //=======================//
        case 325:
          addValue(
            balanceSheet,
            [
              "Capital Próprio e Passivo",
              "Passivo",
              "Passivo Corrente",
              "Passivos não correntes detidos para venda",
            ],
            accountBal
          );
          break;
        //=======================//

        default:
          // console.log('Unhandled Taxonomy Code:', accountTaxCode, '\tWith balance of:', accountBal); //'  -->  ', account.ClosingCreditBalance, account.OpeningCreditBalance, account.ClosingDebitBalance, account.OpeningDebitBalance);
          break;
      }
    });

    // ATIVO
    balanceSheet["Ativo"]["Total do Ativo corrente"] = sumProperties(
      balanceSheet["Ativo"]["Ativo corrente"]
    );
    balanceSheet["Ativo"]["Total do Ativo não corrente"] = sumProperties(
      balanceSheet["Ativo"]["Ativo não corrente"]
    );
    balanceSheet["Ativo"]["Total do Ativo"] =
      balanceSheet["Ativo"]["Total do Ativo corrente"] +
      balanceSheet["Ativo"]["Total do Ativo não corrente"];

    // CAPITAL PRÓPRIO
    balanceSheet["Capital Próprio e Passivo"]["Capital Próprio"][
      "Total do Capital Próprio"
    ] = sumProperties(
      balanceSheet["Capital Próprio e Passivo"]["Capital Próprio"]
    );

    // PASSIVO
    balanceSheet["Capital Próprio e Passivo"]["Passivo"][
      "Total do Passivo corrente"
    ] = sumProperties(
      balanceSheet["Capital Próprio e Passivo"]["Passivo"]["Passivo Corrente"]
    );
    balanceSheet["Capital Próprio e Passivo"]["Passivo"][
      "Total do Passivo não corrente"
    ] = sumProperties(
      balanceSheet["Capital Próprio e Passivo"]["Passivo"][
        "Passivo Não Corrente"
      ]
    );
    balanceSheet["Capital Próprio e Passivo"]["Passivo"]["Total do Passivo"] =
      balanceSheet["Capital Próprio e Passivo"]["Passivo"][
        "Total do Passivo corrente"
      ] +
      balanceSheet["Capital Próprio e Passivo"]["Passivo"][
        "Total do Passivo não corrente"
      ];

    // CP + PASSIVO
    balanceSheet["Capital Próprio e Passivo"][
      "Total do Capital Próprio e do Passivo"
    ] =
      balanceSheet["Capital Próprio e Passivo"]["Passivo"]["Total do Passivo"] +
      balanceSheet["Capital Próprio e Passivo"]["Capital Próprio"][
        "Total do Capital Próprio"
      ];

    global.balanceSheet = balanceSheet;

    res.json(balanceSheet);
  });
};

//================================//
//       MÉTODOS AUXILIARES       //
//================================//

function addValue(obj, path, value) {
  let fullPath = obj[path[0]];
  // check if path exists
  for (let i = 1; i < path.length; i++) {
    if (fullPath[path[i]] === undefined) {
      console.log("ERROR: Setting undefined path:", path);
      return;
    } else {
      fullPath = fullPath[path[i]];
    }
  }

  // check if trying to set an object instead of a number
  if (isNaN(fullPath)) {
    console.log("ERROR: Setting entire object and not a number on path:", path);
    return;
  }

  // this can probably be improved to be dynamic, works for 3 lvls
  switch (path.length) {
    case 1:
      obj[path[0]] += value;
      break;

    case 2:
      obj[path[0]][path[1]] += value;
      break;

    case 3:
      obj[path[0]][path[1]][path[2]] += value;
      break;

    case 4:
      obj[path[0]][path[1]][path[2]][path[3]] += value;
      break;

    case 5:
      obj[path[0]][path[1]][path[2]][path[3]][path[4]] += value;
      break;

    default:
      console.log("ERROR: Entered default in object addValue");
      break;
  }
}

function sumProperties(obj) {
  let count = 0;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      count += obj[key];
    }
  }
  return count;
}

function calculateDependentTotalValues(anualTotalValues) {
  // EBITDA
  anualTotalValues["18"] =
    anualTotalValues["1"] +
    anualTotalValues["2"] +
    anualTotalValues["3"] +
    anualTotalValues["4"] +
    anualTotalValues["5"] -
    anualTotalValues["6"] -
    anualTotalValues["7"] -
    anualTotalValues["8"] -
    anualTotalValues["10"] -
    anualTotalValues["11"] -
    anualTotalValues["12"] -
    anualTotalValues["13"] +
    anualTotalValues["15"] +
    anualTotalValues["16"] +
    anualTotalValues["17"];

  // Resultado Operacional
  anualTotalValues["21"] =
    anualTotalValues["18"] - anualTotalValues["19"] - anualTotalValues["20"];

  // EBIT
  anualTotalValues["24"] =
    anualTotalValues["21"] + anualTotalValues["22"] - anualTotalValues["23"];

  // Net Income
  anualTotalValues["26"] = anualTotalValues["24"] - anualTotalValues["25"];
}

function calculateDependentMonthlyValues(monthlyTotalValues) {
  for (let month in monthlyTotalValues) {
    // EBITDA
    monthlyTotalValues[month]["18"] =
      getPropVal(monthlyTotalValues[month], "1") +
      getPropVal(monthlyTotalValues[month], "2") +
      getPropVal(monthlyTotalValues[month], "3") +
      getPropVal(monthlyTotalValues[month], "4") +
      getPropVal(monthlyTotalValues[month], "5") -
      getPropVal(monthlyTotalValues[month], "6") -
      getPropVal(monthlyTotalValues[month], "7") -
      getPropVal(monthlyTotalValues[month], "8") -
      getPropVal(monthlyTotalValues[month], "10") -
      getPropVal(monthlyTotalValues[month], "11") -
      getPropVal(monthlyTotalValues[month], "12") -
      getPropVal(monthlyTotalValues[month], "13") +
      getPropVal(monthlyTotalValues[month], "15") +
      getPropVal(monthlyTotalValues[month], "16") +
      getPropVal(monthlyTotalValues[month], "17");

    // Resultado Operacional
    monthlyTotalValues[month]["21"] =
      getPropVal(monthlyTotalValues[month], "18") -
      getPropVal(monthlyTotalValues[month], "19") -
      getPropVal(monthlyTotalValues[month], "20");

    // EBIT
    monthlyTotalValues[month]["24"] =
      getPropVal(monthlyTotalValues[month], "21") +
      getPropVal(monthlyTotalValues[month], "22") -
      getPropVal(monthlyTotalValues[month], "23");

    // Net Income
    monthlyTotalValues[month]["26"] =
      getPropVal(monthlyTotalValues[month], "24") -
      getPropVal(monthlyTotalValues[month], "25");
  }
}
