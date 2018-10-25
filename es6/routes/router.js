import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/../../UI/index.html'));
});

router.get('/dashboard', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/../../UI/dashboard.html'));
});

router.get('/admindash', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/../../UI/admindash.html'));
});

router.get('/addproduct', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/../../UI/addproduct.html'));
});

router.get('/addattendant', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/../../UI/addattendant.html'));
});

router.get('/attendantprofile', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/../../UI/attendantprofile.html'));
});

router.get('/attendants', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/../../UI/attendants.html'));
});

router.get('/cart', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/../../UI/cart.html'));
});

router.get('/deleteproduct', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/../../UI/deleteproduct.html'));
});

router.get('/editproduct', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/../../UI/editproduct.html'));
});

router.get('/salerecord', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/../../UI/salerecord.html'));
});

router.get('/viewsales', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/../../UI/viewsales.html'));
});

router.get('/product', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/../../UI/product.html'));
});


module.exports = router;
