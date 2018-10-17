// const Joi = require('joi');
const express = require('express');
const path = require('path');

// const products = require('./routes/product');
// const sales = require('./routes/sales');

const app = express();

app.use(express.json());

// app.use('/products', products);
// app.use('/sales', sales);

// GET /products

app.get('/api/v1/products', (req, res) => {
	res.send('Get all products');
});

// GET /products/<productId>

app.get('/api/v1/products/:id', (req, res) => {
	res.send('Get product by ID');
});

// POST /products

app.post('/api/v1/products', (req, res) => {
	res.send('Post product');
});

// GET /sales
app.get('/api/v1/sales', (req, res) => {
	res.send('Get all sales records');
})

// GET /sales/<saleId>

app.get('/api/v1/sales/:id', (req, res) => {
	res.send('Get sales by ID')
});

// POST /sales

app.post('/api/v1/sales', (req, res) => {
	res.send('Post sales');
});


app.get('/', (req, res) => {
	res.send('Homepage');
});



app.listen(1234, () => {
	console.log('Server statrted, listening on port 1234');
});