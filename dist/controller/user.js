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

var login = function login(req, res) {
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
};

var signup = function signup(req, res) {
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
};

var Users = {
	login: login,
	signup: signup
};

exports.default = Users;