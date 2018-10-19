const Joi = require('joi');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

// import Joi from 'joi';
// import express from 'express';
// import path from 'path';
// import bodyParser from 'body-parser';
// import indexRouter from './routes/index';

// const products = require('./routes/product');
// const sales = require('./routes/sales');

const app = express();

app.use(express.json());

const products = [];
let productItem = {};

const sales = [];
let saleRecord = {};

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

app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.get('/api/v1/products', (req, res) => {
  res.send(products);
});

app.get('/api/v1/products/:id', (req, res) => {
  productItem = products.find(item => item.id === parseInt(req.params.id, 10));
  if (!productItem) {
    return res.status(404).send('Product with the given ID was not found');
  }
  res.send(productItem);
});

app.post('/api/v1/products', (req, res) => {
  const result = validateUser(req.body);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  productItem = {
    id: products.length + 1,
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    amount: req.body.amount,
    minAllowed: req.body.minAllowed,
    price: req.body.price,
  };

  products.push(productItem);

  res.redirect('/addproduct?data=success');
});

app.get('/api/v1/sales', (req, res) => {
  res.send(sales);
});

app.get('/api/v1/sales/:id', (req, res) => {
  saleRecord = sales.find(sale => sale.id === parseInt(req.params.id, 10));
  if (!saleRecord) {
    return res.status(404).send('Sales record with the given ID was not found');
  }
  res.send(saleRecord);
});

app.post('/api/v1/sales', (req, res) => {
  const thisSale = {
    id: sales.length + Math.floor((Math.random() * 10) + 1),
    attendantId: req.body.attendantId,
    attendantName: req.body.attendantName,
    products: req.body.products,
    date: req.body.date,
    price: req.body.price,
  };

  sales.push(thisSale);
  res.send(thisSale);
});

const server = app.listen(1234, () => {
  console.log('Server statrted, listening on port 1234');
});

module.exports = server;
