'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Auth = {
	verifyAdmin: function verifyAdmin(req, res, next) {
		// const token = req.headers['x-access-token'];
		var token = 1;
		if (token != 1) {
			return res.status(401).send({
				success: false,
				message: 'User has no admin previllege'
			});
		}

		res.status(200).send({
			success: true,
			message: 'User has admin previllege'
		});

		next();
	},
	verifyAttendant: function verifyAttendant(req, res, next) {
		// const token = req.headers['x-access-token'];
		var token = 0;
		if (token != 0) {
			return res.status(401).send({
				success: false,
				message: 'User has no access previllege'
			});
		}

		res.status(200).send({
			success: true,
			message: 'User has access previllege'
		});

		next();
	}
};

exports.default = Auth;