import client from '../models/db';

client.query('SELECT firstname FROM users WHERE id = 1', (err, result) => {
			if(err) {
				return console.log(err);
			}
			console.log(result.rows);	
		});	