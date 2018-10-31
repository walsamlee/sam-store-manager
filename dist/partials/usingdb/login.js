'use strict';

var login = function login(req, res, next) {
	var config = {
		user: 'samstore',
		database: 'storemanager',
		password: 'compt',
		port: 5432,
		max: 10, // max number of connection can be open to database
		idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
	};

	pool.connect(function (err, client, done) {
		if (err) {
			console.log("not able to get connection " + err);
			res.status(400).send(err);
		}
		client.query('SELECT * from users', function (err, result) {
			//call `done()` to release the client back to the pool
			done();
			if (err) {
				console.log(err);
				res.status(400).send(err);
			}
			res.status(200).send(result.rows);
		});
	});
};