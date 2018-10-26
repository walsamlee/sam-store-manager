import {expect} from 'chai';
import app from '../app';
import request from 'supertest';

const saleRecord = {
	"attendantId": "1",
	"attendantName": "Victor",
	"products": "Macbook air",
	"date": "20-10-2018",
	"price": "450000"
}

const sales = request.agent(app);
before((done) => {
  sales
    .post('/api/v1/sales')
    .send(saleRecord)
    .end((err, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
});

describe('GET /api/v1/sales', (done) => {
  it('should return a 200 response if sales is fetched', (done) => {
    sales.get('/api/v1/sales')
    .expect(200, done);
  });
});

const salesId = 1;
describe('GET /api/v1/sales/<salesId>', (done) => {
  it('should return a 404 response if sales with ID is not found', (done) => {
  	sales.get('/api/v1/sales/' + salesId)
  	.expect(404, done);
  });	
});