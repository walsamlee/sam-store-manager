'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

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

var _validateUser = require('../partials/validateUser');

var _validateUser2 = _interopRequireDefault(_validateUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Helper = {
	/* Add sales record */
	recordSales: function recordSales(req, res) {
		var saleId = _salesData2.default.showSales().length;
		var result = (0, _validatesale2.default)(req.body);

		if (result.error) {
			return res.status(400).send({
				success: false,
				message: result.error.details[0].message
			});
		}

		var thisSale = {
			saleId: saleId + 1,
			attendantid: req.body.attendantid,
			attendantname: req.body.attendantname,
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

	/* Add a product to store */
	addProduct: function addProduct(req, res) {
		var productItem = {};

		var result = (0, _validateproduct2.default)(req.body);

		if (result.error) {
			return res.status(400).send({
				success: false,
				message: result.error.details[0].message
			});
		}

		var name = req.body.name,
		    category = req.body.category,
		    description = req.body.description,
		    amount = req.body.amount,
		    minallowed = req.body.minallowed,
		    price = req.body.price;

		var query = {
			text: 'INSERT INTO inventory(name, category, description, amount, minallowed, price) VALUES($1, $2, $3, $4, $5, $6)',
			values: [name, category, description, amount, minallowed, price]
		};
		_db2.default.query(query, function (err, res) {
			if (err) {
				return console.log(err.stack);
			} else {
				console.log(res.rows[0]);
			}
		});

		res.status(200).send({
			success: true,
			message: 'Product added to inventory successfully',
			data: req.body
		});
	},

	/* Get all products from store */
	inventory: function inventory(req, res) {
		_db2.default.query('SELECT * FROM inventory', function (err, result) {
			if (err) {
				return res.status(400).send({
					success: false,
					message: 'Data not retrieived'
				});
			}
			return res.status(200).send({
				success: true,
				message: 'Products retrieived successfully',
				data: result.rows
			});
		});
	},

	/* Get products from store by ID */
	productId: function productId(req, res) {
		var productId = parseInt(req.params.productId, 10);

		var query = {
			text: 'SELECT * FROM inventory WHERE id = $1',
			values: [productId]
		};

		_db2.default.query(query, function (err, result) {
			if (err) {
				return res.status(400).send({
					success: false,
					message: 'Data not retrieived'
				});
			}
			return res.status(200).send({
				success: true,
				message: 'Product with Product ID ' + productId + ' has been updated',
				data: result.rows[0]
			});
		});
	},

	/* Delete product by ID */
	deleteProduct: function deleteProduct(req, res) {
		var productId = parseInt(req.params.productId, 10);

		var query = {
			text: 'DELETE FROM inventory WHERE id = $1',
			values: [productId]
		};

		_db2.default.query(query, function (err, result) {
			if (err) {
				return res.status(404).send({
					success: false,
					message: 'User not found'
				});
			}
			return res.status(200).send({
				success: true,
				message: 'Product with Product ID ' + productId + ' has been removed from inventory',
				data: result.rows[0]
			});
		});
	},

	/* Edit product */
	editProduct: function editProduct(req, res) {
		var productid = parseInt(req.params.productId, 10);

		var result = (0, _validateproduct2.default)(req.body);

		if (result.error) {
			return res.status(400).send({
				success: false,
				message: result.error.details[0].message
			});
		}

		var name = req.body.name,
		    category = req.body.category,
		    description = req.body.description,
		    amount = req.body.amount,
		    minallowed = req.body.minallowed,
		    price = req.body.price;

		_db2.default.query('UPDATE inventory SET name = $2, category = $3, description = $4, amount = $5, minallowed = $6, price = $7 WHERE id = $1', [productid, name, category, description, amount, minallowed, price], function (err, result) {
			if (err) {
				return res.status(400).send({
					success: false,
					message: err.stack
				});
			}

			return res.status(202).send({
				success: true,
				message: 'Product with Product ID ' + productid + ' has been updated',
				data: req.body
			});
		});
	},
	login: function login(req, res) {
		var email = req.body.email;
		var aUser = void 0;
		console.log(email);

		var query = {
			text: 'SELECT * FROM users WHERE email = $1',
			values: [email]
		};

		_db2.default.query(query, function (err, result) {
			if (err) {
				return res.send({
					success: false,
					message: 'Data not retrieived'
				});
			}

			aUser = result.rows[0];

			console.log(aUser);

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
		});
	},
	signup: function signup(req, res) {
		var result = (0, _validateUser2.default)(req.body);

		if (result.error) {
			return res.status(400).send({
				success: false,
				message: result.error.details[0].message
			});
		}
		var id = 1,
		    firstname = req.body.firstname,
		    lastname = req.body.lastname,
		    email = req.body.email,
		    password = req.body.password,
		    previllege = req.body.previllege;

		_bcrypt2.default.hash(myPlaintextPassword, saltRounds, function (err, hash) {
			// Store hash in your password DB.
		});
		var query = {
			text: 'INSERT INTO users(email, password, previllege, firstname, lastname) VALUES($1, $2, $3, $4, $5)',
			values: [email, password, previllege, firstname, lastname]
		};

		_db2.default.query(query, function (err, res) {
			if (err) {
				console.log(err.stack);
			} else {
				console.log(res.rows[0]);
			}
		});
		res.send({
			success: true,
			message: 'User added successfully',
			data: res.body
		});
	}
};

exports.default = Helper;