const express = require('express');
const path = require('path');

// const products = require('./routes/product');
// const sales = require('./routes/sales');

const app = express();

app.use(express.json());


//--------------Data structure to hold data in memory------------
let products = [];
let productItem = {};

let sales = [];
let saleRecord = {};

// app.use('/products', products);
// app.use('/sales', sales);

//-------------------ROUTES--------------------
// GET /products

app.get('/api/v1/products', (req, res) => {
	res.send(products);
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
//--------------end---------------------------


//------------------SERVER----------------------------
const server = app.listen(1234, () => {
	console.log('Server statrted, listening on port 1234');
});
