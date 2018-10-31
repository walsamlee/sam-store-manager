import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import router from './routes/router';
import Auth from './middleware/Auth';
import Helper from './controller/Helper';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use('/', router);

/** * **************************** API Enpoints ********************************** */

/** * ------------- PUT Product by productId ------------- */
app.put('/api/v1/products/:productId', Auth.verifyToken, Auth.verifyAdmin, Helper.editProduct);

/** * ------------- DELETE Product by productId ------------- */
app.delete('/api/v1/products/:productId', Auth.verifyToken, Auth.verifyAdmin, Helper.deleteProduct);

/** * ------------- POST logIn ------------- */
app.post('/api/v1/auth/login', Helper.login);

/** * ------------- POST signup ------------- */
app.post('/api/v1/auth/signup', Auth.verifyToken, Auth.verifyAdmin, Helper.signup);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = server;
