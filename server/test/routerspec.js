'use strict';

var _chai = require('chai');

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = _supertest2.default.agent(_app2.default);

describe('GET /', function (done) {
	it('should return a 200 response', function (done) {
		routes.get('/').expect(200, done);
	});
});

describe('GET /addattendant', function (done) {
	it('should return a 200 response', function (done) {
		routes.get('/addattendant').expect(200, done);
	});
});

describe('GET /addproduct', function (done) {
	it('should return a 200 response', function (done) {
		routes.get('/addproduct').expect(200, done);
	});
});

describe('GET /admindash', function (done) {
	it('should return a 200 response', function (done) {
		routes.get('/admindash').expect(200, done);
	});
});

describe('GET /attendantprofile', function (done) {
	it('should return a 200 response', function (done) {
		routes.get('/attendantprofile').expect(200, done);
	});
});

describe('GET /attendants', function (done) {
	it('should return a 200 response', function (done) {
		routes.get('/attendants').expect(200, done);
	});
});

describe('GET /cart', function (done) {
	it('should return a 200 response', function (done) {
		routes.get('/cart').expect(200, done);
	});
});

describe('GET /dashboard', function (done) {
	it('should return a 200 response', function (done) {
		routes.get('/dashboard').expect(200, done);
	});
});

describe('GET /deleteproduct', function (done) {
	it('should return a 200 response', function (done) {
		routes.get('/deleteproduct').expect(200, done);
	});
});

describe('GET /editproduct', function (done) {
	it('should return a 200 response', function (done) {
		routes.get('/editproduct').expect(200, done);
	});
});

describe('GET /product', function (done) {
	it('should return a 200 response', function (done) {
		routes.get('/product').expect(200, done);
	});
});

describe('GET /salerecord', function (done) {
	it('should return a 200 response', function (done) {
		routes.get('/salerecord').expect(200, done);
	});
});

describe('GET /viewsales', function (done) {
	it('should return a 200 response', function (done) {
		routes.get('/viewsales').expect(200, done);
	});
});