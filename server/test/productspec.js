'use strict';

var _chai = require('chai');

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addProduct = {
  "name": "IPhone XS Max",
  "description": "Apple's latest phone II",
  "category": "Mobile phone",
  "amount": "20",
  "minAllowed": "1",
  "price": "750000"
};

var products = _supertest2.default.agent(_app2.default);
before(function (done) {
  products.post('/api/v1/products').send(addProduct).end(function (err, response) {
    (0, _chai.expect)(response.statusCode).to.equal(200);
    done();
  });
});

describe('GET /api/v1/products', function (done) {
  it('should return a 200 response if product is fetched', function (done) {
    products.get('/api/v1/products').expect(200, done);
  });
});

var productId = 1;
describe('GET /api/v1/products/<productId>', function (done) {
  it('should return a 200 response if product with ID is found', function (done) {
    products.get('/api/v1/products/' + productId).expect(200, done);
  });
});