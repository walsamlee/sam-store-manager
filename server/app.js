import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import passport from 'passport';
import strategy from 'passport-local';
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

const products = [];
let productItem = {};

const sales = [];

let saleRecord = {};

const users = [
  {
    id: 1,
    email: 'admin@store.com',
    password: 'computer',
    previllege: 1,
  },
  {
    id: 2,
    email: 'attendant1@store.com',
    password: 'computer',
    previllege: 0,
  },
  {
    id: 3,
    email: 'attendant2@store.com',
    password: 'computer',
    previllege: 0,
  },
];

passport.use(new strategy({
  usernameField: 'email',
},
(email, password, done) => {
  // const user = users.find((user) => {
  //  user.email === email;
  // })

  const user = users[0];

  if (email === user.email && password === user.password) {
    return done(null, user);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users[0].id === id ? users[0] : false;
  done(err, user);
});

app.use(session({
  genid: req => uuid(),
  // store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '/../public')));

app.use('/', router);

/** * **************************** API Enpoints ********************************** */

/** * -------------User API-------------------- */
/** * ############# POST User ################# */
app.post('/api/v1/login', (req, res, next) => {

});

/** * -------------Product API-------------------- */
/** * ############# GET Product ################# */
app.get('/api/v1/products', (req, res) => {
  res.send(
    {
      success: true,
      message: 'products was successfully retrieved',
      data: products,
    },
  );
});

/** * ############ GET Product by productId ################ */
app.get('/api/v1/products/:productId', (req, res) => {
  productItem = products.find(item => item.productId === parseInt(req.params.productId, 10));
  if (!productItem) {
    return res.status(404).send(
      {
        success: false,
        message: `Product with ID ${req.params.productId} was not found`,
      },
    );
  }
  return res.send(
    {
      success: true,
      message: `Product with ID ${req.params.productId} was found`,
      data: productItem,
    },
  );
});

/** * ####################### POST Product ######################## */
app.post('/api/v1/products', (req, res) => {
  if (req.isAuthenticated()) {
    const authuser = req.user;
    if (authuser.previllege === 1) {
      /** * +++++++++++++++ Validate data +++++++++++++++++ */
      const result = validateProduct(req.body);

      if (result.error) {
        return res.status(400).send({
          success: false,
          message: result.error.details[0].message,
        });
      }

      productItem = {
        productId: products.length + 1,
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        amount: req.body.amount,
        minAllowed: req.body.minAllowed,
        price: req.body.price,
      };

      products.push(productItem);

      return res.send(
        {
          success: true,
          message: 'Product added to inventory successfully',
          data: productItem,
        },
      );
    }
    return res.send(
      {
        success: false,
        message: 'You don\'t have permission to be here',
      },
    );
  }
  res.send(
    {
      success: false,
      message: 'Please login as admin',
    },
  );
});

/** * ------------------ Sales API ------------------ */
// ################# GET Sales record ##########
app.get('/api/v1/sales', Auth.verifyAdmin, Helper.sales);

/** * ################# GET Sales Record by salesId ################ */
app.get('/api/v1/sales/:saleId', (req, res) => {
  saleRecord = sales.find(sale => sale.saleId === parseInt(req.params.saleId, 10));
  if (!saleRecord) {
    return res.status(404).send(
      {
        success: false,
        message: `Sales record with ID ${req.params.saleId} ID was not found`,
      },
    );
  }
  return res.send(
    {
      success: true,
      message: `Sales record with ID ${req.params.saleId} was found`,
      data: saleRecord,
    },
  );
});

/** * ################# POST Sales Record ################## */
app.post('/api/v1/sales', (req, res) => {
  const result = validateSale(req.body);

  if (result.error) {
    return res.status(404).send({
      success: false,
      message: result.error.details[0].message,
    });
  }

  const thisSale = {
    saleId: sales.length + 1,
    attendantId: req.body.attendantId,
    attendantName: req.body.attendantName,
    products: req.body.products,
    date: req.body.date,
    price: req.body.price,
  };

  sales.push(thisSale);

  return res.send(
    {
      success: true,
      message: 'Sales has been recorded successfully',
      data: thisSale,
    },
  );
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = server;
