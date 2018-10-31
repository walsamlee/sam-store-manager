'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validateproduct = require('../partials/validateproduct');

var _validateproduct2 = _interopRequireDefault(_validateproduct);

var _validatesale = require('../partials/validatesale');

var _validatesale2 = _interopRequireDefault(_validatesale);

var _salesData = require('../partials/salesData');

var _salesData2 = _interopRequireDefault(_salesData);

var _productData = require('../partials/productData');

var _productData2 = _interopRequireDefault(_productData);

var _users = require('../partials/users');

var _users2 = _interopRequireDefault(_users);

var _db = require('../models/db');

var _db2 = _interopRequireDefault(_db);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Helper = {
	/* Add sales record */
	recordSales: function recordSales(req, res) {
		var saleId = _salesData2.default.showSales().length;
		var result = (0, _validatesale2.default)(req.body);

		if (result.error) {
			return res.status(404).send({
				success: false,
				message: result.error.details[0].message
			});
		}

		var thisSale = {
			saleId: saleId + 1,
			attendantId: req.body.attendantId,
			attendantName: req.body.attendantName,
			products: req.body.products,
			date: req.body.date,
			price: req.body.price
		};

		_salesData2.default.addSales(thisSale);

		return res.send({
			success: true,
			message: 'Sales has been recorded successfully',
			data: thisSale
		});
	},

	/* Get sales record */
	sales: function sales(req, res) {
		var salesRecord = _salesData2.default.showSales();

		res.status(200).send({
			success: true,
			message: 'Data loaded successfully',
			data: salesRecord
		});
	},

	/* Get sales record by ID */
	salesId: function salesId(req, res) {
		var salesData = _salesData2.default.showSales();

		var saleRecord = {};

		saleRecord = salesData.find(function (sale) {
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
	},

	/* Add product to store */
	addProduct: function addProduct(req, res) {
		var productId = _productData2.default.showProducts.length;
		var productItem = {};

		var result = (0, _validateproduct2.default)(req.body);

		if (result.error) {
			return res.status(400).send({
				success: false,
				message: result.error.details[0].message
			});
		}

		productItem = {
			productId: productId + 1,
			name: req.body.name,
			category: req.body.category,
			description: req.body.description,
			amount: req.body.amount,
			minAllowed: req.body.minAllowed,
			price: req.body.price
		};

		_productData2.default.addItem(productItem);

		return res.status(200).send({
			success: true,
			message: 'Product added to inventory successfully',
			data: productItem
		});
	},

	/* Get products from store */
	inventory: function inventory(req, res) {
		var inventory = _productData2.default.showProducts();

		res.status(200).send({
			success: true,
			message: 'Data loaded successfully',
			data: inventory
		});
	},

	/* Get products from store by ID */
	productId: function productId(req, res) {
		var inventoryItems = _productData2.default.showProducts();
		var productItem = inventoryItems.find(function (item) {
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
	},
	deleteProduct: function deleteProduct(req, res) {
		res.send({
			success: true,
			message: 'You are here in deleteProduct',
			data: req.userData
		});
	},
	editProduct: function editProduct(req, res) {
		res.send({
			success: true,
			message: 'You are here in editProduct',
			data: req.userData
		});
	},
	login: function login(req, res) {
		_db2.default.query('SELECT * FROM users', function (err, result) {
			if (err) {
				return res.send({
					success: false,
					message: 'Data not retrieived'
				});
			}
			res.status(200).send({
				success: true,
				message: 'Data successfully retrieved',
				data: result.rows
			});
		});

		var userData = _users2.default.showUser();

		var aUser = userData.find(function (item) {
			return item.email === req.body.email;
		});

		if (!aUser) {
			return res.status(401).send({
				success: false,
				message: 'User not found'
			});
		}

		var token = _jsonwebtoken2.default.sign({
			id: aUser.id,
			previlledge: aUser.previllege
		}, process.env.SECRET, {
			expiresIn: '1d'
		});

		return res.status(200).send({
			success: true,
			message: 'Token encoded',
			data: token
		});
	},
	signup: function signup(req, res) {
		res.send({
			success: true,
			message: 'You are here in signup',
			data: req.userData
		});
	}
};

exports.default = Helper;