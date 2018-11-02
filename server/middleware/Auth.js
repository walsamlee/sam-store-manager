
import jwt from 'jsonwebtoken';

const Auth = {
	verifyAdmin(req, res, next) {
		const token = req.userData.previlledge;
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
		const token = req.userData.previlledge;
		console.log(token);
		if (token != 0) {
			return res.status(401).send({
				success: false,
				message: 'Access to route denied',
			});
		}

		res.status(200);

		next()
	},
	verifyToken(req, res, next) {
		try {
			const token = req.headers.authorization.split(' ')[1];

			const decoded = jwt.verify(token, process.env.SECRET);

			req.userData = decoded;

			next();

		} catch (error) {
			res.status(401).send({
				success: false,
				message: 'Authentication failed'
			})
		}
	}
}

export default Auth;