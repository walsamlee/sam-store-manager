

const _joi = require('joi');

const _joi2 = _interopRequireDefault(_joi);

const _express = require('express');

const _express2 = _interopRequireDefault(_express);

const _path = require('path');

const _path2 = _interopRequireDefault(_path);

const _bodyParser = require('body-parser');

const _bodyParser2 = _interopRequireDefault(_bodyParser);

const _index = require('./routes/index');

const _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const products = require('./routes/product');
// const sales = require('./routes/sales');

const app = (0, _express2.default)(); // const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const indexRouter = require('./routes/index');
// const Joi = require('joi');

app.use(_express2.default.json());

// --------------Data structure to hold data in memory------------
const products = [];
let productItem = {};

const sales = [];
let saleRecord = {};

app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use('/', _index2.default);

// -----------------Joi data validation----------------
function validateUser(user) {
  const schema = {
    name: _joi2.default.string().required(),
    category: _joi2.default.string().required(),
    description: _joi2.default.string().required(),
    amount: _joi2.default.string().required(),
    minAllowed: _joi2.default.string().required(),
    price: _joi2.default.string().required(),

    // name: Joi.string().min(3).required(),
    // sex: Joi.string().min(4).required(),
    // age: Joi.number().integer().min(18).max(59).required()
  };

  return _joi2.default.validate(user, schema);
}
// --------------end---------------------------

// -------------------API endpoints--------------------
// GET /products

app.get('/api/v1/products', (req, res) => {
  res.send(products);
});

// GET /products/<productId>

app.get('/api/v1/products/:id', (req, res) => {
  productItem = products.find(item => item.id === parseInt(req.params.id));
  if (!productItem) {
    return res.status(404).send('Product with the given ID was not found');
  }
  res.send(productItem);
});

// POST /products

app.post('/api/v1/products', (req, res) => {
  const result = validateUser(req.body);

  // console.log(schema);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  productItem = {
    id: products.length + 1,
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    amount: req.body.amount,
    minAllowed: req.body.minAllowed,
    price: req.body.price,
  };

  products.push(productItem);

  res.redirect('/addproduct?data=success');
});

// GET /sales
app.get('/api/v1/sales', (req, res) => {
  res.send(sales);
});

// GET /sales/<saleId>

app.get('/api/v1/sales/:id', (req, res) => {
  saleRecord = sales.find(sale => sale.id === parseInt(req.params.id));
  if (!saleRecord) {
    return res.status(404).send('Sales record with the given ID was not found');
  }
  res.send(saleRecord);
});

// POST /sales

app.post('/api/v1/sales', (req, res) => {
  const thisSale = {
    id: sales.length + Math.floor(Math.random() * 10 + 1),
    attendantId: req.body.attendantId,
    attendantName: req.body.attendantName,
    products: req.body.products,
    date: req.body.date,
    price: req.body.price,
  };

  sales.push(thisSale);
  res.send(thisSale);
});

// --------------end---------------------------


// ------------------SERVER----------------------------
const server = app.listen(1234, () => {
  console.log('Server statrted, listening on port 1234');
});

module.exports = server;
