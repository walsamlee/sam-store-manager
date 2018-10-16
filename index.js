const express = require('express');
const path = require('path');

const app = express();

app.listen(1234, () => {
	console.log('Server statrted, listening on port 1234');
});