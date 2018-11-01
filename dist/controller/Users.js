'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _db = require('../models/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Data input validation */
var validateUser = function validateUser(user) {
	var schema = {
		firstname: _joi2.default.string().required(),
		lastname: _joi2.default.string().required(),
		email: _joi2.default.string().email({ minDomainAtoms: 2 }).required(),
		password: _joi2.default.string().required(),
		previllege: _joi2.default.number().integer(1).required()
	};

	return _joi2.default.validate(user, schema);
};

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
	var result = validateUser(req.body);

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