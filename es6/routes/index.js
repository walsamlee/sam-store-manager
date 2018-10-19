// const express = require('express');
import express from 'express';

const router = express.Router();

// app.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.status(200).render('index');
});

router.get('/dashboard', (req, res) => {
  res.status(200).render('dashboard');
});

router.get('/admindash', (req, res) => {
  res.status(200).render('admindash');
});

router.get('/addproduct', (req, res) => {
  res.status(200).render('addproduct', { productadded: '', data: '' });
});

router.get('/attendantprofile', (req, res) => {
  res.status(200).render('attendantprofile');
});

router.get('/attendants', (req, res) => {
  res.status(200).render('attendants');
});

router.get('/cart', (req, res) => {
  res.status(200).render('cart');
});

router.get('/deleteproduct', (req, res) => {
  res.status(200).render('deleteproduct');
});

router.get('/editproduct', (req, res) => {
  res.status(200).render('editproduct');
});

router.get('/product', (req, res) => {
  res.status(200).render('product');
});

router.get('/salerecord', (req, res) => {
  res.status(200).render('salerecord');
});

router.get('/viewsales', (req, res) => {
  res.status(200).render('viewsales');
});

router.get('/test', (req, res) => {
  res.status(200).render('test');
});


module.exports = router;
