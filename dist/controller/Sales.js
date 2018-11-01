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
var validateSale = function validateSale(aSale) {
	var schema = {
		attendantId: _joi2.default.string().required(),
		attendantName: _joi2.default.string().required(),
		products: _joi2.default.string().required(),
		date: _joi2.default.string().required(),
		price: _joi2.default.number().integer().required()
	};

	return _joi2.default.validate(aSale, schema);
};
/* Add sales record */
var recordSales = function recordSales(req, res) {
	var result = validateSale(req.body);

	if (result.error) {
		return res.status(400).send({
			success: false,
			message: result.error.details[0].message
		});
	}

	var name = req.body.name,
	    attendantid = req.body.attendantid,
	    attendantname = req.body.attendantname,
	    products = req.body.products,
	    date = req.body.date,
	    price = req.body.price;

	var query = {
		text: 'INSERT INTO sales(attendantid, attendantname, products, date, price) VALUES($1, $2, $3, $4, $5)',
		values: [attendantid, attendantname, products, date, price]
	};

	_db2.default.query(query, function (err, res) {
		if (err) {
			return console.log(err.stack);
		} else {
			return res.send({
				success: true,
				message: 'Sales has been recorded successfully',
				data: thisSale
			});
		}
	});
};

/* Get sales record */
var getSales = function getSales(req, res) {
	_db2.default.query('SELECT * FROM sales', function (err, result) {
		if (err) {
			return res.status(400).send({
				success: false,
				message: 'Data not retrieived'
			});
		}
		return res.status(200).send({
			success: true,
			message: 'Sales record retrieived successfully',
			data: result.rows
		});
	});
};
/* Get sales record by ID */
var getSaleId = function getSaleId(req, res) {
	var salesData = sales.showSales();

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
};

var Sales = {
	recordSales: recordSales,
	getSales: getSales,
	getSaleId: getSaleId
};

exports.default = Sales;