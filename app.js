'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const products = require('./routes/product');
// const sales = require('./routes/sales');

var app = (0, _express2.default)(); // const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const indexRouter = require('./routes/index');
// const Joi = require('joi');

app.use(_express2.default.json());

//--------------Data structure to hold data in memory------------
var products = [];
var productItem = {};

var sales = [];
var saleRecord = {};

app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use('/', _index2.default);

//-----------------Joi data validation----------------
function validateUser(user) {
	var schema = {
		name: _joi2.default.string().required(),
		category: _joi2.default.string().required(),
		description: _joi2.default.string().required(),
		amount: _joi2.default.string().required(),
		minAllowed: _joi2.default.string().required(),
		price: _joi2.default.string().required()

		// name: Joi.string().min(3).required(),
		// sex: Joi.string().min(4).required(),
		// age: Joi.number().integer().min(18).max(59).required()
	};

	return _joi2.default.validate(user, schema);
}
//--------------end---------------------------

//-------------------API endpoints--------------------
// GET /products

app.get('/api/v1/products', function (req, res) {
	res.send(products);
});

// GET /products/<productId>

app.get('/api/v1/products/:id', function (req, res) {
	productItem = products.find(function (item) {
		return item.id === parseInt(req.params.id);
	});
	if (!productItem) {
		return res.status(404).send('Product with the given ID was not found');
	};
	res.send(productItem);
});

// POST /products

app.post('/api/v1/products', function (req, res) {
	var result = validateUser(req.body);

	// console.log(schema);

	if (result.error) {
		return res.status(400).send(result.error.details[0].message);
	};

	productItem = {
		id: products.length + 1,
		name: req.body.name,
		category: req.body.category,
		description: req.body.description,
		amount: req.body.amount,
		minAllowed: req.body.minAllowed,
		price: req.body.price
	};

	products.push(productItem);

	res.redirect('/addproduct?data=success');
});

// GET /sales
app.get('/api/v1/sales', function (req, res) {
	res.send(sales);
});

// GET /sales/<saleId>

app.get('/api/v1/sales/:id', function (req, res) {
	saleRecord = sales.find(function (sale) {
		return sale.id === parseInt(req.params.id);
	});
	if (!saleRecord) {
		return res.status(404).send('Sales record with the given ID was not found');
	};
	res.send(saleRecord);
});

// POST /sales

app.post('/api/v1/sales', function (req, res) {
	var thisSale = {
		id: sales.length + Math.floor(Math.random() * 10 + 1),
		attendantId: req.body.attendantId,
		attendantName: req.body.attendantName,
		products: req.body.products,
		date: req.body.date,
		price: req.body.price
	};

	sales.push(thisSale);
	res.send(thisSale);
});

//--------------end---------------------------


//------------------SERVER----------------------------
var server = app.listen(80, function () {
	console.log('Server statrted, listening on port 1234');
});

module.exports = server;