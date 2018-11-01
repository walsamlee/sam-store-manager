import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import router from './routes/router';
import Auth from './middleware/Auth';
import Products from './controller/Products';
import Sales from './controller/Sales';
import Users from './controller/Users';

const app = express();

app.use(express.json());

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use('/', router);

/** * **************************** API Enpoints ********************************** */

/** * --------------- POST Sales Record --------------- */
app.post('/api/v1/sales', Auth.verifyToken, Auth.verifyAttendant, Sales.recordSales);

/** * ------------- POST Product by ------------- */
app.get('/api/v1/sales', Auth.verifyToken, Auth.verifyAdmin, Sales.getSales);

/** * ------------- POST Product by ------------- */
app.get('/api/v1/products', Auth.verifyToken, Auth.verifyAdmin, Products.inventory);

/** * ------------- POST Product by ------------- */
app.post('/api/v1/products', Auth.verifyToken, Auth.verifyAdmin, Products.addProduct);

/** * ------------- PUT Product by productId ------------- */
app.put('/api/v1/products/:productId', Auth.verifyToken, Auth.verifyAdmin, Products.editProduct);

/** * ------------- DELETE Product by productId ------------- */
app.delete('/api/v1/products/:productId', Auth.verifyToken, Auth.verifyAdmin, Products.deleteProduct);

/** * ------------- POST logIn ------------- */
app.post('/api/v1/auth/login', Users.login);

/** * ------------- POST signup ------------- */
app.post('/api/v1/auth/signup', Auth.verifyToken, Auth.verifyAdmin, Users.signup);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = server;
