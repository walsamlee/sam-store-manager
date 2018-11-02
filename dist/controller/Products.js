'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _db = require('../models/db');

var _db2 = _interopRequireDefault(_db);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Data input validation */
var validateProduct = function validateProduct(prodItem) {
	var schema = {
		name: _joi2.default.string().required(),
		category: _joi2.default.string().required(),
		description: _joi2.default.string().required(),
		amount: _joi2.default.number().integer().required(),
		minallowed: _joi2.default.number().integer().required(),
		price: _joi2.default.number().integer().required()
	};

	return _joi2.default.validate(prodItem, schema);
};
/* Add a product to store */
var addProduct = function addProduct(req, res) {
	var productItem = {};

	var result = validateProduct(req.body);

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
			return res.status(400).send({
				success: false,
				message: 'Product could not added'
			});
		} else {
			return res.status(200).send({
				success: true,
				message: 'Products added successfully',
				data: result.rows
			});
		}
	});

	res.status(200).send({
		success: true,
		message: 'Product added to inventory successfully',
		data: req.body
	});
};

/* Get all products from store */
var inventory = function inventory(req, res) {
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
};

/* Get products from store by ID */
var getProduct = function getProduct(req, res) {
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
};

/* Delete product by ID */
var deleteProduct = function deleteProduct(req, res) {
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
};
/* Edit product */
var editProduct = function editProduct(req, res) {
	var productid = parseInt(req.params.productId, 10);

	var result = validateProduct(req.body);

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
			message: 'Product with Product ID ' + productid + ' updated successfully',
			data: req.body
		});
	});
};

var Products = {
	addProduct: addProduct,
	inventory: inventory,
	getProduct: getProduct,
	deleteProduct: deleteProduct,
	editProduct: editProduct
};

exports.default = Products;