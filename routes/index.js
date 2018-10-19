'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// app.use(bodyParser.urlencoded({ extended: true }));

// const express = require('express');
router.get('/', function (req, res) {
  res.status(200).render('index');
});

router.get('/dashboard', function (req, res) {
  res.status(200).render('dashboard');
});

router.get('/admindash', function (req, res) {
  res.status(200).render('admindash');
});

router.get('/addproduct', function (req, res) {
  res.status(200).render('addproduct', { productadded: '', data: '' });
});

router.get('/attendantprofile', function (req, res) {
  res.status(200).render('attendantprofile');
});

router.get('/attendants', function (req, res) {
  res.status(200).render('attendants');
});

router.get('/cart', function (req, res) {
  res.status(200).render('cart');
});

router.get('/deleteproduct', function (req, res) {
  res.status(200).render('deleteproduct');
});

router.get('/editproduct', function (req, res) {
  res.status(200).render('editproduct');
});

router.get('/product', function (req, res) {
  res.status(200).render('product');
});

router.get('/salerecord', function (req, res) {
  res.status(200).render('salerecord');
});

router.get('/viewsales', function (req, res) {
  res.status(200).render('viewsales');
});

router.get('/test', function (req, res) {
  res.status(200).render('test');
});

module.exports = router;