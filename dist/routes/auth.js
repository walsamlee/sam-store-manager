import passport from 'passport';
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/auth/login', (req, res, next) => {
	passport.authenticate('local', {session: false}, (err, user, info) => {
		if (err || !user) {
			return res.status(400).json({
				message: 'Error',
				user: user,
			});
		}
		req.login(user, {session: false}, (err) => {
			if (err) {
				res.send(err);
			}
			const token = jwt.sign(user, 'admin forever');
			return res.json({user, token});
		});
	})(req, res);
});