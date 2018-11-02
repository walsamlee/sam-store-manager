'use strict';

var _db = require('../models/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_db2.default.query('SELECT firstname FROM users WHERE id = 1', function (err, result) {
	if (err) {
		return console.log(err);
	}
	console.log(result.rows);
});