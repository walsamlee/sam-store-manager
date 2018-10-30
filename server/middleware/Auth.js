const Auth = {
	verifyAdmin(req, res, next) {
		const token = req.headers['x-access-token'];
		console.log(token);
		if (token != 1) {
			return res.status(401).send({
				success: false,
				message: 'Access to route denied',
			});
		}

		res.status(200);

		next()
	},

	verifyAttendant(req, res, next) {
		const token = req.headers['x-access-token'];
		if (token != 0) {
			return res.status(401).send({
				success: false,
				message: 'Access to route denied',
			});
		}

		res.status(200);

		next()
	},

	loggedIn(req, res, next) {
		const token = req.headers['x-access-token'];
		if ((token != 0) && (token != 1)) {
			return res.status(401).send({
				success: false,
				message: 'Access to view products route denied',
			});
		}

		res.status(200);

		next();
	}
}

export default Auth;