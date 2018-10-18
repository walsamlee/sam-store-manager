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
	productItem = products.find(item => item.id === parseInt(req.params.id));
	if (!productItem) {
		return res.status(404).send('Product with the given ID was not found');
	};
	res.send(productItem);
});

// POST /products

app.post('/api/v1/products', (req, res) => {
	productItem = {
		id: products.length + Math.floor((Math.random() * 10) + 1),
		name: req.body.name,
		category: req.body.category,
		description: req.body.description,
		amount: req.body.amount,
		minAllowed: req.body.minAllowed,
		price: req.body.price
	};

	products.push(productItem);

	res.send(productItem);
});

// GET /sales
app.get('/api/v1/sales', (req, res) => {
	res.send(sales);
})

// GET /sales/<saleId>

app.get('/api/v1/sales/:id', (req, res) => {
	saleRecord = sales.find(sale => sale.id === parseInt(req.params.id));
	if (!saleRecord) {
		return res.status(404).send('Sales record with the given ID was not found');
	};
	res.send(saleRecord);
});

// POST /sales

app.post('/api/v1/sales', (req, res) => {
	const thisSale = {
		id: sales.length + Math.floor((Math.random() * 10) + 1),
		attendantId: req.body.attendantId,
		attendantName: req.body.attendantName,
		products: req.body.products,
		date: req.body.date,
		price: req.body.price
	};

	sales.push(thisSale);
	res.send(thisSale);
});


app.get('/', (req, res) => {
	res.send('Homepage');
});
//--------------end---------------------------


//------------------SERVER----------------------------
const server = app.listen(1234, () => {
	console.log('Server statrted, listening on port 1234');
});
