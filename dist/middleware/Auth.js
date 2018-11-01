'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Auth = {
	verifyAdmin: function verifyAdmin(req, res, next) {
		var token = req.userData.previlledge;
		console.log(token);
		if (token != 1) {
			return res.status(401).send({
				success: false,
				message: 'Access to route denied'
			});
		}

		res.status(200);

		next();
	},
	verifyAttendant: function verifyAttendant(req, res, next) {
		var token = req.userData.previlledge;
		console.log(token);
		if (token != 0) {
			return res.status(401).send({
				success: false,
				message: 'Access to route denied'
			});
		}

		res.status(200);

		next();
	},
	verifyToken: function verifyToken(req, res, next) {
		try {
			var token = req.headers.authorization.split(' ')[1];

			var decoded = _jsonwebtoken2.default.verify(token, process.env.SECRET);

			req.userData = decoded;

			next();
		} catch (error) {
			res.status(401).send({
				success: false,
				message: 'Authentication failed'
			});
		}
	}
};

exports.default = Auth;