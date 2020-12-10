import jsonServer from 'json-server';
import cors from 'cors';
import salesController from './modules/sales.js';
import generalAccountsController from './modules/generalAccounts.js';
import headerController from './modules/header.js';
import suppliersController from './modules/suppliers.js';
import balanceSheetController from './modules/balanceSheet.js';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middleware = jsonServer.defaults({noCors: true});
const db = router.db.__wrapped__;
server.use(cors());

//Custom route test
server.get('/echo', (req, res) => {
    res.jsonp(req.query);
})

generalAccountsController(server, db);
salesController(server, db);
headerController(server, db);
suppliersController(server, db);
balanceSheetController(server, db);

server.use(middleware);
server.use(router);
server.listen(5000, () => {
    console.log('Server running at http://localhost:5000')
});

export default server;