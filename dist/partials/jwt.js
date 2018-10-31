'use strict';

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwt = function jwt() {
	return (0, _expressJwt2.default)(process.env.SECRET);
};

module.exports = jwt;