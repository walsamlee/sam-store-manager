const Auth = {
	verifyAdmin(req, res, next) {
		// const token = req.headers['x-access-token'];
		const token = 1;
		if (token != 1) {
			return res.status(401).send({
				success: false,
				message: 'User has no admin previllege',
			});
		}

		res.status(200).send({
			success: true,
			message: 'User has admin previllege',
		});

		next()
	},

	verifyAttendant(req, res, next) {
		// const token = req.headers['x-access-token'];
		const token = 0;
		if (token != 0) {
			return res.status(401).send({
				success: false,
				message: 'User has no access previllege',
			});
		}

		res.status(200).send({
			success: true,
			message: 'User has access previllege',
		});

		next()
	},
}

export default Auth;