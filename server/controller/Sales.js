import client from '../models/db';
import Joi from 'joi';

/* Data input validation */
const validateSale = (aSale) => {
  const schema = {
    attendantid: Joi.string().required(),
    attendantname: Joi.string().required(),
    products: Joi.string().required(),
    date: Joi.string().required(),
    price: Joi.number().integer().required(),
  };

  return Joi.validate(aSale, schema);
};
/* Add sales record */
const recordSales = (req, res) => {
	console.log(req.body);
  const result = validateSale(req.body);

  if (result.error) {
    return res.status(400).send({
      success: false,
      message: result.error.details[0].message,
    });
  }

  const name = req.body.name,
	    attendantid = req.body.attendantid,
	    attendantname = req.body.attendantname,
	    products = req.body.products,
	    date = req.body.date,
	    price = req.body.price;

  const query = {
		text: 'INSERT INTO sales(attendantid, attendantname, products, date, price) VALUES($1, $2, $3, $4, $5)',
	  values: [attendantid, attendantname, products, date, price],
	};

  client.query(query, (err, result) => {
  	if (err) {
  		 return console.log(err.stack)
  	} else {
  		return res.send(
	    {
	      success: true,
	      message: 'Sales has been recorded successfully',
	      data: result.rows[0],
	    },
	  );
  	}
  });

};

/* Get sales record */
const getSales = (req, res) => {
	client.query('SELECT * FROM sales', (err, result) => {
		if(err) {
			return res.status(400).send({
				success: false,
				message: 'Data not retrieived',
			});
		}
		return res.status(200).send({
			success: true,
			message: 'Sales record retrieived successfully',
			data: result.rows
		});
	});
}
/* Get sales record by ID */
const getSaleId = (req, res) => {
	const saleId = parseInt(req.params.saleId, 10); 

	const query = {
		text: 'SELECT * FROM sales WHERE id = $1',
	    values: [saleId]
	};

	client.query(query, (err, result) => {
		if(err) {
			return res.status(404).send({
				success: false,
				message: `Sales record with ID ${saleId} was found`,
			});
		}
		return res.status(200).send({
			success: true,
			message: `Sales record with ID ${saleId} was found`,
			data: result.rows[0]
		});
	});
};


const Sales = {
	recordSales,
	getSales,
	getSaleId
}

export default Sales;
