const Helper = {
	sales(req, res) {
		res.status(200).send({
			success: true,
			message: 'Route reached successfully',
		})
	}
}

export default Helper;