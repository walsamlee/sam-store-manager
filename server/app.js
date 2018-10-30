import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import uuid from 'uuid';
import router from './routes/router';
import validateProduct from './partials/validateproduct';
import validateSale from './partials/validatesale';
import Auth from './middleware/Auth';
import Helper from './controller/Helper';


const app = express();

app.use(express.json());

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(session({
  genid: req => uuid(),
  // store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, '/../public')));

app.use('/', router);

/** * **************************** API Enpoints ********************************** */

/** * -------------User API-------------------- */
/** * ############# POST User ################# */
app.post('/api/v1/login', (req, res, next) => {

});

/** * -------------Product API-------------------- */
/** * ############# GET Product ################# */
app.get('/api/v1/products', Auth.loggedIn, Helper.inventory);

/** * ############ GET Product by productId ################ */
app.get('/api/v1/products/:productId', Auth.verifyAdmin, Helper.productId);

/** * ####################### POST Product ######################## */
app.post('/api/v1/products', Auth.verifyAdmin, Helper.addProduct);

/** * ------------------ Sales API ------------------ */
// ################# GET Sales record ##########
app.get('/api/v1/sales', Auth.verifyAdmin, Helper.sales);

/** * ################# GET Sales Record by salesId ################ */
app.get('/api/v1/sales/:saleId', Auth.verifyAdmin, Helper.salesId);

/** * ################# POST Sales Record ################## */
app.post('/api/v1/sales', Auth.verifyAttendant, Helper.recordSales);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = server;
