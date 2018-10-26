import {expect} from 'chai';
import app from '../app';
import request from 'supertest';

const routes = request.agent(app);

describe('GET /', (done) => {
	it('should return a 200 response', (done) => {
		routes.get('/')
		.expect(200, done);
	});
});

describe('GET /addattendant', (done) => {
	it('should return a 200 response', (done) => {
		routes.get('/addattendant')
		.expect(200, done);
	});
});

describe('GET /addproduct', (done) => {
	it('should return a 200 response', (done) => {
		routes.get('/addproduct')
		.expect(200, done);
	});
});

describe('GET /admindash', (done) => {
	it('should return a 200 response', (done) => {
		routes.get('/admindash')
		.expect(200, done);
	});
});

describe('GET /attendantprofile', (done) => {
	it('should return a 200 response', (done) => {
		routes.get('/attendantprofile')
		.expect(200, done);
	});
});

describe('GET /attendants', (done) => {
	it('should return a 200 response', (done) => {
		routes.get('/attendants')
		.expect(200, done);
	});
});

describe('GET /cart', (done) => {
	it('should return a 200 response', (done) => {
		routes.get('/cart')
		.expect(200, done);
	});
});

describe('GET /dashboard', (done) => {
	it('should return a 200 response', (done) => {
		routes.get('/dashboard')
		.expect(200, done);
	});
});

describe('GET /deleteproduct', (done) => {
	it('should return a 200 response', (done) => {
		routes.get('/deleteproduct')
		.expect(200, done);
	});
});

describe('GET /editproduct', (done) => {
	it('should return a 200 response', (done) => {
		routes.get('/editproduct')
		.expect(200, done);
	});
});

describe('GET /product', (done) => {
	it('should return a 200 response', (done) => {
		routes.get('/product')
		.expect(200, done);
	});
});

describe('GET /salerecord', (done) => {
	it('should return a 200 response', (done) => {
		routes.get('/salerecord')
		.expect(200, done);
	});
});

describe('GET /viewsales', (done) => {
	it('should return a 200 response', (done) => {
		routes.get('/viewsales')
		.expect(200, done);
	});
});