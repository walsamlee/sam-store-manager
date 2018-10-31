import validateProduct from '../partials/validateproduct';
import validateSale from '../partials/validatesale';
import sales from '../partials/salesData';
import products from '../partials/productData';
import users from '../partials/users';
import client from '../models/db';
import jwt from 'jsonwebtoken';

const Helper = {
	/* Add sales record */
	recordSales(req, res) {
	  const saleId = (sales.showSales()).length;
      const result = validateSale(req.body);

	  if (result.error) {
	    return res.status(404).send({
	      success: false,
	      message: result.error.details[0].message,
	    });
	  }

	  const thisSale = {
	    saleId: saleId + 1,
	    attendantId: req.body.attendantId,
	    attendantName: req.body.attendantName,
	    products: req.body.products,
	    date: req.body.date,
	    price: req.body.price,
	  };

	  sales.addSales(thisSale);

	  return res.send(
	    {
	      success: true,
	      message: 'Sales has been recorded successfully',
	      data: thisSale,
	    },
	  );
	},
	/* Get sales record */
	sales(req, res) {
		const salesRecord = sales.showSales();

		res.status(200).send({
			success: true,
			message: 'Data loaded successfully',
			data: salesRecord,
		})
	},
	/* Get sales record by ID */
	salesId (req, res) {
		const salesData = sales.showSales();

		let saleRecord = {};

		saleRecord = salesData.find(sale => sale.saleId === parseInt(req.params.saleId, 10));
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
	},
	/* Add product to store */
	addProduct(req, res) {
		const productId = (products.showProducts).length;
      let productItem = {};

	  const result = validateProduct(req.body);

	  if (result.error) {
	    return res.status(400).send({
	      success: false,
	      message: result.error.details[0].message,
	    });
	  }

	  productItem = {
	    productId: productId + 1,
	    name: req.body.name,
	    category: req.body.category,
	    description: req.body.description,
	    amount: req.body.amount,
	    minAllowed: req.body.minAllowed,
	    price: req.body.price,
	  };

	  products.addItem(productItem);

	  return res.status(200).send(
	    {
	      success: true,
	      message: 'Product added to inventory successfully',
	      data: productItem,
	    },
	  );
	},
	/* Get products from store */
	inventory(req, res) {
		const inventory = products.showProducts();

		res.status(200).send({
			success: true,
			message: 'Data loaded successfully',
			data: inventory,
		})
	},
	/* Get products from store by ID */
	productId(req, res) {
		const inventoryItems = products.showProducts();
		const productItem = inventoryItems.find(item => item.productId === parseInt(req.params.productId, 10));
		  
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
	},
	deleteProduct(req, res) {
		res.send({
			success: true,
			message: 'You are here in deleteProduct',
			data: req.userData
		});
	},
	editProduct(req, res) {
		res.send({
			success: true,
			message: 'You are here in editProduct',
			data: req.userData
		});
	},
	login(req, res) {
		client.query('SELECT * FROM users', (err, result) => {
			if(err) {
				return res.send({
					success: false,
					message: 'Data not retrieived',
				});
			}
			res.status(200).send({
			success: true,
			message: 'Data successfully retrieved',
			data: result.rows,
			});		
		});	

		const userData = users.showUser();

		const aUser = userData.find(item => item.email === req.body.email);

		if (!aUser) {
			return res.status(401).send({
				success: false,
				message: 'User not found'
			})
		}

		const token = jwt.sign({
			id: aUser.id,
			previlledge: aUser.previllege
		}, 
		process.env.SECRET, 
		{
			expiresIn: '1d'
		});

		return res.status(200).send({
			success: true,
			message: 'Token encoded',
			data: token
		});
	},
	signup(req, res) {
		res.send({
			success: true,
			message: 'You are here in signup',
			data: req.userData
		});
	}
}

export default Helper;
