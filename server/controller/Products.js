import client from '../models/db';
import Joi from 'joi';

/* Data input validation */
const validateProduct = (prodItem) => {
  const schema = {
    name: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    amount: Joi.number().integer().required(),
    minallowed: Joi.number().integer().required(),
    price: Joi.number().integer().required(),
  };

  return Joi.validate(prodItem, schema);
};
/* Add a product to store */
const addProduct = (req, res) => {
  let productItem = {};

  const result = validateProduct(req.body);

  if (result.error) {
    return res.status(400).send({
      success: false,
      message: result.error.details[0].message,
    });
  }

  const name = req.body.name,
	    category = req.body.category,
	    description = req.body.description,
	    amount = req.body.amount,
	    minallowed = req.body.minallowed,
	    price = req.body.price;

  const query = {
		text: 'INSERT INTO inventory(name, category, description, amount, minallowed, price) VALUES($1, $2, $3, $4, $5, $6)',
	  values: [name, category, description, amount, minallowed, price],
	};

  client.query(query, (err, res) => {
  	if (err) {
  		 return res.status(400).send({
			success: false,
			message: 'Product could not added',
		});
  	} else {
  		return res.status(200).send({
			success: true,
			message: 'Products added successfully',
			data: result.rows
		});
  	}
  });
  
  res.status(200).send(
    {
      success: true,
      message: 'Product added to inventory successfully',
      data: req.body,
    },
  );
};

/* Get all products from store */
const inventory = (req, res) => {
	client.query('SELECT * FROM inventory', (err, result) => {
		if(err) {
			return res.status(400).send({
				success: false,
				message: 'Data not retrieived',
			});
		}
		return res.status(200).send({
			success: true,
			message: 'Products retrieived successfully',
			data: result.rows
		});
	});
};

/* Get products from store by ID */
const getProduct = (req, res) => {
	const productId = parseInt(req.params.productId, 10);

	const query = {
		text: 'SELECT * FROM inventory WHERE id = $1',
	    values: [productId]
	};

	client.query(query, (err, result) => {
		if(err) {
			return res.status(400).send({
				success: false,
				message: 'Data not retrieived',
			});
		}
		return res.status(200).send({
			success: true,
			message: `Product with Product ID ${productId} has been updated`,
			data: result.rows[0]
		});
	});
};

/* Delete product by ID */
const deleteProduct = (req, res) => {
	const productId = parseInt(req.params.productId, 10);

	const query = {
		text: 'DELETE FROM inventory WHERE id = $1',
	    values: [productId]
	};

	client.query(query, (err, result) => {
		if(err) {
			return res.status(404).send({
				success: false,
				message: 'User not found',
			});
		}
		return res.status(200).send({
			success: true,
			message: `Product with Product ID ${productId} has been removed from inventory`,
			data: result.rows[0]
		});
	});
};
/* Edit product */
const editProduct = (req, res) => {
	const productid = parseInt(req.params.productId, 10);

	const result = validateProduct(req.body);

	  if (result.error) {
	    return res.status(400).send({
	      success: false,
	      message: result.error.details[0].message,
	    });
	  }

	const
		name = req.body.name,
	    category = req.body.category,
	    description = req.body.description,
	    amount = req.body.amount,
	    minallowed = req.body.minallowed,
	    price = req.body.price;
	
	client.query('UPDATE inventory SET name = $2, category = $3, description = $4, amount = $5, minallowed = $6, price = $7 WHERE id = $1', [productid, name, category, description, amount, minallowed, price], (err, result) => {
		if(err) {
			return res.status(400).send({
				success: false,
				message: err.stack,
			});
		}

		return res.status(202).send({
			success: true,
			message: `Product with Product ID ${productid} updated successfully`,
			data: req.body
		});
	});
};

const Products = {
	addProduct,
	inventory,
	getProduct,
	deleteProduct,
	editProduct,
}

export default Products;
