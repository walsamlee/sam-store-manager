'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.json());

var products = [];
var productItem = {};

var sales = [];
var saleRecord = {};

var urlencodedParser = _bodyParser2.default.urlencoded({ extended: false });

app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

// app.get('/','index.html');

function validateUser(user) {
  var schema = {
    name: _joi2.default.string().required(),
    category: _joi2.default.string().required(),
    description: _joi2.default.string().required(),
    amount: _joi2.default.string().required(),
    minAllowed: _joi2.default.string().required(),
    price: _joi2.default.string().required()
  };

  return _joi2.default.validate(user, schema);
}

app.get('/api/v1/products', function (req, res) {
  res.send({
    success: true,
    message: 'products was successfully retirieved',
    data: products
  });
});

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

app.post('/api/v1/products', urlencodedParser, function (req, res) {
  var result = validateUser(req.body);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
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
});

app.get('/api/v1/sales', function (req, res) {
  res.send({
    success: true,
    message: 'Sales record was successfully retirieved',
    data: sales
  });
});

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

app.post('/api/v1/sales', function (req, res) {
  var thisSale = {
    saleId: sales.length + Math.floor(Math.random() * 10 + 1),
    attendantId: req.body.attendantId,
    attendantName: req.body.attendantName,
    products: req.body.products,
    date: req.body.date,
    price: req.body.price
  };

  sales.push(thisSale);

  res.send({
    success: true,
    message: 'Sales has been recorded successfully',
    date: thisSale
  });
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  console.log('App listening on port ' + port);
});

module.exports = server;