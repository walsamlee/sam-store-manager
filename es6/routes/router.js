import express from 'express';
import path from 'path';

const router = express.Router();

// app.use(bodyParser.urlencoded({ extended: true }));

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


module.exports = router;