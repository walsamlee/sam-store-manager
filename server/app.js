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
app.get('/api/v1/auth/login', Helper.logDemo);

/** * ############# Product API ################# */
/** * ------------- GET Product -------------------- */
app.get('/api/v1/products', Auth.loggedIn, Helper.inventory);

/** * ------------- GET Product by productId ------------- */
app.get('/api/v1/products/:productId', Auth.verifyAdmin, Helper.productId);

/** * ------------- POST Product ------------- */
app.post('/api/v1/products', Auth.verifyAdmin, Helper.addProduct);

/** * ------------- PUT Product by productId ------------- */
app.put('/api/v1/products/:productId', Auth.verifyAdmin, Helper.editProduct);

/** * ------------- DELETE Product by productId ------------- */
app.delete('/api/v1/products/:productId', Auth.verifyAdmin, Helper.deleteProduct);

/** * ################# Sales API ################# */
/** ------------- GET Sales record ------------- */
app.get('/api/v1/sales', Auth.verifyAdmin, Helper.sales);

/** * ------------- GET Sales Record by salesId ------------- */
app.get('/api/v1/sales/:saleId', Auth.verifyAdmin, Helper.salesId);

/** * ------------- POST Sales Record ------------- */
app.post('/api/v1/sales', Auth.verifyAttendant, Helper.recordSales);

/** * ################# Auth API for Sign In and Sign Up ################# */

/** * ------------- POST logIn ------------- */
app.post('api/v1/auth/login', Helper.login);

/** * ------------- POST signup ------------- */
app.post('api/v1/auth/signup', Auth.verifyAdmin, Helper.signup);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = server;
