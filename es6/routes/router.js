
import express from 'express';
import path from 'path';

const router = express.Router();

// app.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/../../UI/index.html'));
});

module.exports = router;