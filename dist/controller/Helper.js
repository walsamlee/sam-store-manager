'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Helper = {
	sales: function sales(req, res) {
		res.status(200).send({
			success: true,
			message: 'Route reached successfully'
		});
	}
};

exports.default = Helper;