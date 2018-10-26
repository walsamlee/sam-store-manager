import {expect} from 'chai';
import app from '../app';
import request from 'supertest';

const addProduct = {	
	"name": "IPhone XS Max",
	"description": "Apple's latest phone II",
	"category": "Mobile phone",
	"amount": "20",
	"minAllowed": "1",
	"price": "750000"
}

const products = request.agent(app);
before((done) => {
  products
    .post('/api/v1/products')
    .send(addProduct)
    .end((err, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
});

describe('GET /api/v1/products', (done) => {
  it('should return a 200 response if product is fetched', (done) => {
    products.get('/api/v1/products')
    .expect(200, done);
  });
});

const productId = 1;
describe('GET /api/v1/products/<productId>', (done) => {
  it('should return a 200 response if product with ID is found', (done) => {
  	products.get('/api/v1/products/' + productId)
  	.expect(200, done);
  });	
});