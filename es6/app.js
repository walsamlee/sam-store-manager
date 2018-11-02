import Joi from 'joi';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());

const products = [];
let productItem = {};

const sales = [];
let saleRecord = {};

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/" + "index.html");
});

function validateUser(user) {
  const schema = {
    name: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    amount: Joi.string().required(),
    minAllowed: Joi.string().required(),
    price: Joi.string().required(),
  };

  return Joi.validate(user, schema);
}

app.get('/api/v1/products', (req, res) => {
  res.send(
    {
      success: true,
      message: 'products was successfully retirieved',
      data: products,
    },
  );
});

app.get('/api/v1/products/:productId', (req, res) => {
  productItem = products.find(item => item.productId === parseInt(req.params.productId, 10));
  if (!productItem) {
    return res.status(404).send(
      {
        success: false,
        message: `Product with ID ${req.params.productId} was not found`,
      },
    );
  }
  return res.send(
    {
      success: true,
      message: `Product with ID ${req.params.productId} was found`,
      data: productItem,
    },
  );
});

app.post('/api/v1/products', urlencodedParser, (req, res) => {
  const result = validateUser(req.body);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  productItem = {
    productId: products.length + 1,
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    amount: req.body.amount,
    minAllowed: req.body.minAllowed,
    price: req.body.price,
  };

  products.push(productItem);

  return res.send(
    {
      success: true,
      message: 'Product added to inventory successfully',
      data: productItem,
    },
  );
});

app.get('/api/v1/sales', (req, res) => {
  res.send(
    {
      success: true,
      message: 'Sales record was successfully retirieved',
      data: sales,
    },
  );
});

app.get('/api/v1/sales/:saleId', (req, res) => {
  saleRecord = sales.find(sale => sale.saleId === parseInt(req.params.saleId, 10));
  if (!saleRecord) {
    return res.status(404).send(
      {
        success: false,
        message: `Sales record with ID ${req.params.saleId} ID was not found`,
      },
    );
  }
  return res.send(
    {
      success: true,
      message: `Sales record with ID ${req.params.saleId} was found`,
      data: saleRecord,
    },
  );
});

app.post('/api/v1/sales', (req, res) => {
  const thisSale = {
    saleId: sales.length + Math.floor((Math.random() * 10) + 1),
    attendantId: req.body.attendantId,
    attendantName: req.body.attendantName,
    products: req.body.products,
    date: req.body.date,
    price: req.body.price,
  };

  sales.push(thisSale);

  res.send(
    {
      success: true,
      message: 'Sales has been recorded successfully',
      date: thisSale,
    },
  );
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = server;
