'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _router = require('./routes/router');

var _router2 = _interopRequireDefault(_router);

var _Auth = require('./middleware/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _Helper = require('./controller/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.json());

var urlencodedParser = _bodyParser2.default.urlencoded({ extended: false });

app.use('/', _router2.default);

/** * **************************** API Enpoints ********************************** */

/** * ------------- PUT Product by productId ------------- */
app.put('/api/v1/products/:productId', _Auth2.default.verifyToken, _Auth2.default.verifyAdmin, _Helper2.default.editProduct);

/** * ------------- DELETE Product by productId ------------- */
app.delete('/api/v1/products/:productId', _Auth2.default.verifyToken, _Auth2.default.verifyAdmin, _Helper2.default.deleteProduct);

/** * ------------- POST logIn ------------- */
app.post('/api/v1/auth/login', _Helper2.default.login);

/** * ------------- POST signup ------------- */
app.post('/api/v1/auth/signup', _Auth2.default.verifyToken, _Auth2.default.verifyAdmin, _Helper2.default.signup);

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  console.log('App listening on port ' + port);
});

module.exports = server;