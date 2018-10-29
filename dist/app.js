'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _router = require('./routes/router');

var _router2 = _interopRequireDefault(_router);

var _validateproduct = require('./partials/validateproduct');

var _validateproduct2 = _interopRequireDefault(_validateproduct);

var _validatesale = require('./partials/validatesale');

var _validatesale2 = _interopRequireDefault(_validatesale);

var _Auth = require('./middleware/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _Helper = require('./controller/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.json());

var urlencodedParser = _bodyParser2.default.urlencoded({ extended: false });

var products = [];
var productItem = {};

var sales = [];

var saleRecord = {};

var users = [{
  id: 1,
  email: 'admin@store.com',
  password: 'computer',
  previllege: 1
}, {
  id: 2,
  email: 'attendant1@store.com',
  password: 'computer',
  previllege: 0
}, {
  id: 3,
  email: 'attendant2@store.com',
  password: 'computer',
  previllege: 0
}];

_passport2.default.use(new _passportLocal2.default({
  usernameField: 'email'
}, function (email, password, done) {
  // const user = users.find((user) => {
  //  user.email === email;
  // })

  var user = users[0];

  if (email === user.email && password === user.password) {
    return done(null, user);
  }
}));

_passport2.default.serializeUser(function (user, done) {
  done(null, user.id);
});

_passport2.default.deserializeUser(function (id, done) {
  var user = users[0].id === id ? users[0] : false;
  done(err, user);
});

app.use((0, _expressSession2.default)({
  genid: function genid(req) {
    return (0, _uuid2.default)();
  },
  // store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

app.use(_express2.default.static(_path2.default.join(__dirname, '/../public')));

app.use('/', _router2.default);

/** * **************************** API Enpoints ********************************** */

/** * -------------User API-------------------- */
/** * ############# POST User ################# */
app.post('/api/v1/login', function (req, res, next) {});

/** * -------------Product API-------------------- */
/** * ############# GET Product ################# */
app.get('/api/v1/products', function (req, res) {
  res.send({
    success: true,
    message: 'products was successfully retrieved',
    data: products
  });
});

/** * ############ GET Product by productId ################ */
app.get('/api/v1/products/:productId', function (req, res) {
  productItem = products.find(function (item) {
    return item.productId === parseInt(req.params.productId, 10);
  });
  if (!productItem) {
    return res.status(404).send({
      success: false,
      message: 'Product with ID ' + req.params.productId + ' was not found'
    });
  }
  return res.send({
    success: true,
    message: 'Product with ID ' + req.params.productId + ' was found',
    data: productItem
  });
});

/** * ####################### POST Product ######################## */
app.post('/api/v1/products', function (req, res) {
  if (req.isAuthenticated()) {
    var authuser = req.user;
    if (authuser.previllege === 1) {
      /** * +++++++++++++++ Validate data +++++++++++++++++ */
      var result = (0, _validateproduct2.default)(req.body);

      if (result.error) {
        return res.status(400).send({
          success: false,
          message: result.error.details[0].message
        });
      }

      productItem = {
        productId: products.length + 1,
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        amount: req.body.amount,
        minAllowed: req.body.minAllowed,
        price: req.body.price
      };

      products.push(productItem);

      return res.send({
        success: true,
        message: 'Product added to inventory successfully',
        data: productItem
      });
    }
    return res.send({
      success: false,
      message: 'You don\'t have permission to be here'
    });
  }
  res.send({
    success: false,
    message: 'Please login as admin'
  });
});

/** * ------------------ Sales API ------------------ */
// ################# GET Sales record ##########
app.get('/api/v1/sales', _Auth2.default.verifyAdmin, _Helper2.default.sales);

/** * ################# GET Sales Record by salesId ################ */
app.get('/api/v1/sales/:saleId', function (req, res) {
  saleRecord = sales.find(function (sale) {
    return sale.saleId === parseInt(req.params.saleId, 10);
  });
  if (!saleRecord) {
    return res.status(404).send({
      success: false,
      message: 'Sales record with ID ' + req.params.saleId + ' ID was not found'
    });
  }
  return res.send({
    success: true,
    message: 'Sales record with ID ' + req.params.saleId + ' was found',
    data: saleRecord
  });
});

/** * ################# POST Sales Record ################## */
app.post('/api/v1/sales', function (req, res) {
  var result = (0, _validatesale2.default)(req.body);

  if (result.error) {
    return res.status(404).send({
      success: false,
      message: result.error.details[0].message
    });
  }

  var thisSale = {
    saleId: sales.length + 1,
    attendantId: req.body.attendantId,
    attendantName: req.body.attendantName,
    products: req.body.products,
    date: req.body.date,
    price: req.body.price
  };

  sales.push(thisSale);

  return res.send({
    success: true,
    message: 'Sales has been recorded successfully',
    data: thisSale
  });
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  console.log('App listening on port ' + port);
});

module.exports = server;