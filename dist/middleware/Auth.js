'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Auth = {
	verifyAdmin: function verifyAdmin(req, res, next) {
		var token = req.headers['x-access-token'];
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
		var token = req.headers['x-access-token'];
		if (token != 0) {
			return res.status(401).send({
				success: false,
				message: 'Access to route denied'
			});
		}

		res.status(200);

		next();
	},
	loggedIn: function loggedIn(req, res, next) {
		var token = req.headers['x-access-token'];
		if (token != 0 && token != 1) {
			return res.status(401).send({
				success: false,
				message: 'Access to view products route denied'
			});
		}

		res.status(200);

		next();
	}
};

exports.default = Auth;