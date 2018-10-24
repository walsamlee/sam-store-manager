'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// app.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function (req, res) {
  res.status(200).sendFile(_path2.default.join(__dirname, '/../../UI/index.html'));
});

router.get('/dashboard', function (req, res) {
  res.status(200).sendFile(_path2.default.join(__dirname, '/../../UI/dashboard.html'));
});

router.get('/admindash', function (req, res) {
  res.status(200).sendFile(_path2.default.join(__dirname, '/../../UI/admindash.html'));
});

router.get('/addproduct', function (req, res) {
  res.status(200).sendFile(_path2.default.join(__dirname, '/../../UI/addproduct.html'));
});

module.exports = router;