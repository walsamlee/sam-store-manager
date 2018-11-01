import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import client from '../models/db';

/* Data input validation */
const validateUser = (user) => {
  const schema = {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required(),
    previllege: Joi.number().integer(1).required()
  };

  return Joi.validate(user, schema);
};

const login = (req, res) => {
	const email = req.body.email;
	let aUser;
	console.log(email);

	const query = {
					text: 'SELECT * FROM users WHERE email = $1',
				    values: [email]
				  };

	client.query(query, (err, result) => {
		if(err) {
			return res.send({
				success: false,
				message: 'Data not retrieived',
			});
		}

		aUser = result.rows[0];

		console.log(aUser);

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
	});	
}

const signup = (req, res) => {
	const result = validateUser(req.body);

	if (result.error) {
	    return res.status(400).send({
	      success: false,
	      message: result.error.details[0].message,
	    });
	  }
	  const
	      id = 1, 
	  	  firstname = req.body.firstname,
		  lastname = req.body.lastname,
		  email = req.body.email,
		  password = req.body.password,
		  previllege = req.body.previllege;

		  bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
			  // Store hash in your password DB.
		  });
	  const query = {
						text: 'INSERT INTO users(email, password, previllege, firstname, lastname) VALUES($1, $2, $3, $4, $5)',
					  values: [email, password, previllege, firstname, lastname],
					};

	  client.query(query, (err, res) => {
	  	if (err) {
	  		console.log(err.stack)
	  	} else {
	  		console.log(res.rows[0])
	  	}

	  });
	res.send({
		success: true,
		message: 'User added successfully',
		data: res.body
	})
}

const Users = {
	login,
	signup,
}

export default Users;
