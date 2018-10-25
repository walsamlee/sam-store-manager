'use strict';

var _chai = require('chai');

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saleRecord = {
  "attendantId": "1",
  "attendantName": "Victor",
  "products": "Macbook air",
  "date": "20-10-2018",
  "price": "450000"
};

var sales = _supertest2.default.agent(_app2.default);
before(function (done) {
  sales.post('/api/v1/sales').send(saleRecord).end(function (err, response) {
    (0, _chai.expect)(response.statusCode).to.equal(200);
    done();
  });
});

describe('GET /api/v1/sales', function (done) {
  it('should return a 200 response if sales is fetched', function (done) {
    sales.get('/api/v1/sales').expect(200, done);
  });
});

var salesId = 1;
describe('GET /api/v1/sales/<salesId>', function (done) {
  it('should return a 404 response if sales with ID is not found', function (done) {
    sales.get('/api/v1/sales/' + salesId).expect(404, done);
  });
});